from flask import Flask, jsonify, request
from flask_socketio import SocketIO, send
from flask_cors import CORS
import number_plate_recognition

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'mysecret'
# socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     data = number_plate_recognition.get_plate_number()
#     print("output: ", data)
#     return data
#
# @socketio.on('message')
# def handle_message(msg):
#     print('Message: ' + msg)
#     send(msg, broadcast=True)

@app.route('/api/upload', methods=['POST'])
def upload_image():
    print("got images")
    file = request.files['image']
    file.save('temp.jpg')

    # # Read the image
    # img = cv2.imread('temp.jpg')
    #
    # # Use pytesseract to do OCR on the image
    # text = pytesseract.image_to_string(img)
    #
    # # Assuming number plate text is extracted successfully
    # plate_number = text.strip()  # Clean up the extracted text

    plate_number = number_plate_recognition.get_plate_number('temp.jpg')

    # Emit the recognized plate number to the client
    socketio.emit('plate_recognized', {'plate_number': plate_number})
    print(plate_number)

    return jsonify({'message': 'Processing started'})

if __name__ == '__main__':
    socketio.run(app, debug=True)
