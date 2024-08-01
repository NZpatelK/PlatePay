import cv2

import predict_modified


def capture():
    # Frame Width and Height
    frameWidth = 2000
    frameHeight = 1280

    # Load the cascade
    plateCascade = cv2.CascadeClassifier("haarcascade_russian_plate_number.xml")

    # Minimum area of the detected plate
    minArea = 1500

    # Capture video from the default webcam
    cap = cv2.VideoCapture(0)
    cap.set(3, frameWidth)
    cap.set(4, frameHeight)
    cap.set(10, 150)

    while True:
        success, img = cap.read()
        if not success:
            print("Failed to capture image")
            break

        imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        numberPlates = plateCascade.detectMultiScale(imgGray, 1.1, 4)

        imgRoi = None
        for (x, y, w, h) in numberPlates:
            area = w * h
            if area > minArea:
                cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
                cv2.putText(img, "NumberPlate", (x, y - 5), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 0, 255), 2)
                imgRoi = img[y:y + h, x:x + w]
                cv2.imshow("Number Plate", imgRoi)

        cv2.imshow("Result", img)
        # if cv2.waitKey(1) & 0xFF == ord('s') and imgRoi is not None:
        if imgRoi is not None:
            # Save the ROI as an image
            save_path = f"./data/temp.jpg"
            cv2.imwrite(save_path, imgRoi)
            cv2.rectangle(img, (0, 200), (640, 300), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, "Scan Saved", (15, 265), cv2.FONT_HERSHEY_COMPLEX, 2, (0, 0, 255), 2)
            cv2.imshow("Result", img)
            print(f"Saved: {save_path}")
            cv2.waitKey(500)
            output_value = predict_modified.get_result()

            if output_value:
                print("real time", output_value)
                break
                # cap.release()
                # cv2.destroyAllWindows()
                # break
                # return output_value



#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break
#
    cap.release()
    cv2.destroyAllWindows()
    print("destory complete it")
