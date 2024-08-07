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
    count = 3
    car_detail = False
    value = ""
    while count > 0:
        Real_Time_Capture.capture()
        value = get_licence_plate()
        no_space_plate = value.replace(" ", "")
        car_detail = get_register_data(no_space_plate.upper())
        if car_detail:
            break

        count -= 1

    request_type = {"recognized": False}
    data = generate_output_car_detail(car_detail, value, request_type )
    socketio.emit('new_data', data)


@socketio.on("number_plate_input")
def handle_get_number_plate(number_plate):
    no_space_plate = number_plate.replace(" ", "")
    car_detail = get_register_data(no_space_plate.upper())

    request_type = {"registered": False, "recognized": True}

    data = generate_output_car_detail(car_detail, number_plate, request_type)
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


def get_register_data(license_number):
    # Load JSON data from a file
    with open('registed.json', 'r') as file:
        data = json.load(file)

    # Define the username to search for
    search_username = "bob"

    # Check if the username exists in the JSON data
    for user in data['cars']:
        if user['license_number'] == license_number:
            return user
            break

    return False


def generate_output_car_detail(car_detail, number_plate, request_type):
    if not car_detail:
        data = request_type
    else:
        data = {
            "number_plate": number_plate.upper(),
            "name": car_detail["name"],
            "balance": car_detail["balance"],
            "default_amount": car_detail["default_amount"],
            "petrol_type": car_detail["petrol_type"],
            "recognized": "true",
            "registered": "true"
        }

    return data


if __name__ == '__main__':
    print("start")
    socketio.run(app, port=5000)
