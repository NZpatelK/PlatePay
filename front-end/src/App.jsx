import { useEffect, useState } from 'react';
import axios from 'axios';
// import socketIOClient from 'socket.io-client';
import io from 'socket.io-client';
import './App.css';

const ENDPOINT = "http://127.0.0.1:5000"; // Flask server endpoint

function App() {
  const [httpResponse, setHttpResponse] = useState("");
  const [socketResponse, setSocketResponse] = useState("");
  const [message, setMessage] = useState("");



  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io('http://127.0.0.1:5000');
    
    // Listen for the 'connect' event
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Listen for the 'new_data' event
    socket.on('new_data', (data) => {
      console.log('New data received:', data);
      setMessage(data.message); // Update state with the new data
    });

    // Listen for the 'disconnect' event
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>React and Flask Communication</h1>
      <h1>Real Time Number Plate Recognition</h1>
      <div>
        <h2>Number Plate: {message}</h2>
        <p>{httpResponse}</p>
      </div>
    </div>
  );
}

export default App;
