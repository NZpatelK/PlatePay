from flask import Flask, jsonify, request
from flask_socketio import SocketIO, send
from flask_cors import CORS
import number_plate_recognition

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/api/data', methods=['GET'])
def get_data():
    data = number_plate_recognition.get_plate_number()
    print("output: ", data)
    return data

@socketio.on('message')
def handle_message(msg):
    print('Message: ' + msg)
    send(msg, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
