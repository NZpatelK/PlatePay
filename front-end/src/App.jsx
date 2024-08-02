import { useEffect, useState } from 'react';
// import axios from 'axios';
// import socketIOClient from 'socket.io-client';
import io from 'socket.io-client';
import './App.css';
import Welcome from './components/Welcome';

// const ENDPOINT = "http://127.0.0.1:5000"; // Flask server endpoint

function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [numberPlate, setNumberPlate] = useState("");

  // Connect to the Socket.IO server
  const socket = io('http://127.0.0.1:5000');

  useEffect(() => {

    const socket = io('http://127.0.0.1:5000');
    // Listen for the 'connect' event
    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('get_data'); // Request data from the server
    });

    // Listen for the 'new_data' event
    socket.on('new_data', (data) => {
      console.log('New data received:', data);
      setMessage(data.message); // Update state with the new data
      setNumberPlate(data.numberPlate);
      setName(data.name);
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

  const fetchData = () => {
    socket.emit('get_data');
  };

  return (
    <div>
      <h1 className='heading'>Patel Station</h1>
      <div className='box'>
          {/* <h2>Number Plate: {message}</h2> */}
          <Welcome name={name} numberPlate={numberPlate}/>
          <button onClick={fetchData}>Fetch Data</button>
      </div>
    </div>
  );
}

export default App;
