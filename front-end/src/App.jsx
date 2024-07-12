import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './App.css';
import DragAndDrop from './components/dragAndDrop';

const socket = io('http://127.0.0.1:5000');

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [plateNumber, setPlateNumber] = useState('');

  useEffect(() => {
    socket.on('plate_recognized', (data) => {
      setPlateNumber(data.plate_number);
      console.log(data.plate_number);
    });

    return () => {
      socket.off('plate_recognized');
    };
  }, []);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    console.log("file: ", file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("selectedFile: ", selectedFile);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      await axios.post('http://127.0.0.1:5000/api/upload', formData, {
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
      <h1 className='title'>Number Plate Recognition</h1>
      <DragAndDrop imageFile={handleFileChange} />
      <button className='submit' onClick={handleSubmit}>Upload and Recognise</button>
      {plateNumber && <div>Recognised Plate Number: {plateNumber}</div>}



      {/* <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload and Recognize</button>
      </form>
      {plateNumber && <div>Recognized Plate Number: {plateNumber}</div>} */}
    </div>
  );
}

export default App;

