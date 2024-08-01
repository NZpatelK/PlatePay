import json
import random
import time

from flask import Flask, jsonify, request
from flask_socketio import SocketIO, send
from flask_cors import CORS

import Real_Time_Capture
import number_plate_recognition
from threading import Thread

import predict_modified


# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'mysecret'
# socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
# socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")



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

# def generate_random_numbers():
#     rounds = 0
#     max_rounds = 10
#     while True:
#         value = input("enter: ")
#         socketio.emit('random_number', {'number': value})
#
# @app.route('/api/upload', methods=['POST'])
# def upload_image():
#     print("got images")
#     file = request.files['image']
#     file.save('temp.jpg')
#
#     plate_number = number_plate_recognition.get_plate_number('temp.jpg')
#
#     # Emit the recognized plate number to the client
#     socketio.emit('plate_recognized', {'plate_number': plate_number})
#     print(plate_number)
#
#     return jsonify({'message': 'Processing started'})


def get_licence_plate():
    # Define the file path
    file_path = 'number_plate_recognition/data.json'

    # Read the JSON file
    with open(file_path, 'r') as file:
        data = json.load(file)

    # Assuming the data is a list of records, get the latest entry
    if isinstance(data, list) and data:
        latest_entry = data[-1]  # Get the latest entry (last in the list)
        license_number = latest_entry.get("license_number", "No license number found")
        print(f'Latest license number: {license_number}')
    else:
        print("No data available or data is not in the expected format.")

if __name__ == '__main__':
    # thread = Thread(target=generate_random_numbers)
    # thread.daemon = True
    # thread.start()
    # socketio.run(app, debug=True)
    print("start")
    # predict_modified.get_result()
    Real_Time_Capture.capture()




