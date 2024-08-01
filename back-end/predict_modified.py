# Ultralytics YOLO 🚀, GPL-3.0 license
import json
import os
import uuid
from datetime import datetime

import hydra
import torch

from ultralytics.yolo.engine.predictor import BasePredictor
from ultralytics.yolo.utils import DEFAULT_CONFIG, ROOT, ops
from ultralytics.yolo.utils.checks import check_imgsz
from ultralytics.yolo.utils.plotting import Annotator, colors, save_one_box


import easyocr
import cv2

reader = easyocr.Reader(['en'], gpu=True)

def perform_ocr_on_image(img, coordinates):
    x, y, w, h = map(int, coordinates)
    cropped_img = img[y:h, x:w]

    gray_img = cv2.cvtColor(cropped_img, cv2.COLOR_RGB2GRAY)
    results = reader.readtext(gray_img)

    text = ""
    for res in results:
        if len(results) == 1 or (len(res[1]) > 6 and res[2] > 0.2):
            text = res[1]

    return str(text)


class DetectionPredictor(BasePredictor):

    def get_annotator(self, img):
        return Annotator(img, line_width=self.args.line_thickness, example=str(self.model.names))

    def preprocess(self, img):
        img = torch.from_numpy(img).to(self.model.device)
        img = img.half() if self.model.fp16 else img.float()  # uint8 to fp16/32
        img /= 255  # 0 - 255 to 0.0 - 1.0
        return img

    def postprocess(self, preds, img, orig_img):
        preds = ops.non_max_suppression(preds,
                                        self.args.conf,
                                        self.args.iou,
                                        agnostic=self.args.agnostic_nms,
                                        max_det=self.args.max_det)

        for i, pred in enumerate(preds):
            shape = orig_img[i].shape if self.webcam else orig_img.shape
            pred[:, :4] = ops.scale_boxes(img.shape[2:], pred[:, :4], shape).round()

        return preds

    def write_results(self, idx, preds, batch):
        p, im, im0 = batch
        log_string = ""
        if len(im.shape) == 3:
            im = im[None]  # expand for batch dim
        self.seen += 1
        im0 = im0.copy()
        if self.webcam:  # batch_size >= 1
            log_string += f'{idx}: '
            frame = self.dataset.count
        else:
            frame = getattr(self.dataset, 'frame', 0)

        self.data_path = p
        # save_path = str(self.save_dir / p.name)  # im.jpg
        # self.txt_path = str(self.save_dir / 'labels' / p.stem) + ('' if self.dataset.mode == 'image' else f'_{frame}')
        log_string += '%gx%g ' % im.shape[2:]  # print string
        self.annotator = self.get_annotator(im0)

        det = preds[idx]
        self.all_outputs.append(det)
        if len(det) == 0:
            return log_string
        for c in det[:, 5].unique():
            n = (det[:, 5] == c).sum()  # detections per class
            log_string += f"{n} {self.model.names[int(c)]}{'s' * (n > 1)}, "
        # write
        gn = torch.tensor(im0.shape)[[1, 0, 1, 0]]  # normalization gain whwh
        for *xyxy, conf, cls in reversed(det):
            if self.args.save_txt:  # Write to file
                xywh = (ops.xyxy2xywh(torch.tensor(xyxy).view(1, 4)) / gn).view(-1).tolist()  # normalized xywh
                line = (cls, *xywh, conf) if self.args.save_conf else (cls, *xywh)  # label format
                with open(f'{self.txt_path}.txt', 'a') as f:
                    f.write(('%g ' * len(line)).rstrip() % line + '\n')

            if self.args.save or self.args.save_crop or self.args.show:  # Add bbox to image
                c = int(cls)  # integer class
                label = None if self.args.hide_labels else (
                    self.model.names[c] if self.args.hide_conf else f'{self.model.names[c]} {conf:.2f}')


                text_ocr = perform_ocr_on_image(im0,xyxy)
                label = text_ocr
                self.result = label

                self.annotator.box_label(xyxy, label, color=colors(c, True))
            if self.args.save_crop:
                imc = im0.copy()
                save_one_box(xyxy,
                             imc,
                             file=self.save_dir / 'crops' / self.model.model.names[c] / f'{self.data_path.stem}.jpg',
                             BGR=True)

        return log_string


def write_in_json(result):
    # Define the file path
    file_path = 'data.json'

    # Data to add
    new_data = {
        "id": str(uuid.uuid4()),  # Generate a unique ID
        "timestamp": datetime.now().isoformat(),  # Get the current timestamp in ISO format
        "license_number": result  # Replace with the new license number
    }

    # Check if the file exists
    if os.path.exists(file_path):
        # Read the existing data
        with open(file_path, 'r') as file:
            data = json.load(file)

        # If the existing data is a list, append the new data
        if isinstance(data, list):
            data.append(new_data)
        else:
            # If it's not a list, you might want to replace or merge data
            # Here we replace the existing data with the new data
            data = new_data
    else:
        # If the file doesn't exist, initialize the data as a list
        data = [new_data]

    # Write the updated data back to the file
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)  # Use indent for pretty-printing

@hydra.main(version_base=None, config_path=str(DEFAULT_CONFIG.parent), config_name=DEFAULT_CONFIG.name)
def predict(cfg):
    cfg.model = 'number_plate_recognition/ultralytics/runs/detect/train_model/weights/best.pt'
    cfg.imgsz = check_imgsz(cfg.imgsz, min_dim=2)  # check image size
    cfg.source = './data/temp.jpg'
    predictor = DetectionPredictor(cfg)
    predictor()
    if hasattr(predictor, 'result'):
        write_in_json(predictor.result)

def get_licence_plate():
    # Define the file path
    file_path = 'data.json'

    # Read the JSON file
    with open(file_path, 'r') as file:
        data = json.load(file)

    # Assuming the data is a list of records, get the latest entry
    if isinstance(data, list) and data:
        latest_entry = data[-1]  # Get the latest entry (last in the list)
        license_number = latest_entry.get("license_number", "No license number found")
        print(f'Latest license number: {license_number}')
        return license_number
    else:
        print("No data available or data is not in the expected format.")
        return None



def get_result():
    print("predict page")
    current_number = get_licence_plate()
    print("predict start....")
    predict()
    new_number = get_licence_plate()

    print(current_number)
    print(new_number)

    return current_number != new_number


if __name__ == "__main__":
    print("predict page")
    get_result()


