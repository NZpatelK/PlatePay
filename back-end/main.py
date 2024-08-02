import json

import Real_Time_Capture

from flask import Flask, jsonify, request
from flask_socketio import SocketIO, send
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/', methods=['GET'])
def get_data():
    Real_Time_Capture.capture()
    value = get_licence_plate()
    data = {"message": value}
    return jsonify(data)

@socketio.on('get_data')
def handle_get_license_plate():
    # Replace this with your specific data fetching logic
    Real_Time_Capture.capture()
    value = get_licence_plate()
    data = {"message": value}
    socketio.emit('new_data', data)

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    socketio.emit('message', 'Connected to the server!')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


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
        print(f'Latest license number 123: {license_number}')
        return license_number
    else:
        print("No data available or data is not in the expected format.")
        return None


if __name__ == '__main__':
    print("start")
    socketio.run(app, port=5000)








