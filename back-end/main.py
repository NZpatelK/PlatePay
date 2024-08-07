import json

import real_time_capture

from flask import Flask, jsonify, request
from flask_socketio import SocketIO, send
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@socketio.on('get_data')
def handle_get_license_plate():
    # Replace this with your specific data fetching logic
    car_detail = False
    value = ""

    # Fetch the license plate value multiple times until a valid one is found
    for _ in range(3):
        real_time_capture.capture()
        value = get_license_plate()
        no_space_plate = value.replace(" ", "")
        car_detail = get_register_data(no_space_plate.upper())
        if car_detail:
            break

    request_type = {"recognized": False} if not car_detail else {"recognized": True}
    data = generate_output_car_detail(car_detail, value, request_type)
    socketio.emit('new_data', data)


@socketio.on("number_plate_input")
def handle_number_plate_input(number_plate):
    cleaned_number_plate = number_plate.replace(" ", "")
    uppercase_number_plate = cleaned_number_plate.upper()
    car_details = get_register_data(uppercase_number_plate)

    request_type = {"registered": False, "recognized": True}

    output_data = generate_output_car_detail(car_details, number_plate, request_type)
    socketio.emit('new_data', output_data)


@socketio.on('connect')
def handle_connect():
    socketio.emit('message', 'Connected to the server!')


@socketio.on('disconnect')
def handle_disconnect():
    pass


def get_license_plate():
    """
    Retrieves the latest license plate number from the data.json file.

    Returns:
        str: The license plate number, or "No license number found" if not found.
        None: If the data.json file is empty or the data is not in the expected format.
    """
    data_file_path = 'data.json'

    try:
        with open(data_file_path, 'r') as file:
            data = json.load(file)

        if isinstance(data, list) and data:
            latest_record = data[-1]  # Get the latest record
            license_number = latest_record.get("license_number", "No license number found")
            return license_number
        else:
            return "No data available or data is not in the expected format."

    except FileNotFoundError:
        return "Data file not found."

    except json.JSONDecodeError:
        return "Invalid JSON format in the data file."


def get_register_data(license_number):
    # Load JSON data from a file
    with open('registed.json', 'r') as file:
        data = json.load(file)

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
