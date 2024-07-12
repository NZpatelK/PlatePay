import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './App.css';
import DragAndDrop from './components/dragAndDrop';

const socket = io('http://127.0.0.1:5000');

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [plateNumber, setPlateNumber] = useState('');

  useEffect(() => {
    const handlePlateRecognized = (data) => {
      setPlateNumber(data.plateNumber);
    };

    socket.on('plate_recognized', handlePlateRecognized);

    return () => {
      socket.off('plate_recognized', handlePlateRecognized);
    };
  }, []);

  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      await axios.post('http://127.0.0.1:5000/api/upload', formData);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h1 className='title'>Number Plate Recognition</h1>
      <DragAndDrop imageFile={handleImageChange} />
      <button className='submit' onClick={handleSubmit}>
        Upload and Recognise
      </button>
      {plateNumber && <div>Recognised Plate Number: {plateNumber}</div>}
    </div>
  );
}

export default App;

