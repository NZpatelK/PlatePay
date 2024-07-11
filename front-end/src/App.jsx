import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [plateNumber, setPlateNumber] = useState('');

  useEffect(() => {
    socket.on('plate_recognized', (data) => {
      setPlateNumber(data.plate_number);
    });

    return () => {
      socket.off('plate_recognized');
    };
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h1>Number Plate Recognition</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload and Recognize</button>
      </form>
      {plateNumber && <div>Recognized Plate Number: {plateNumber}</div>}
    </div> 
  );
}

export default App;
