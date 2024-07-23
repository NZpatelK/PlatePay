// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';
// import './App.css';
// import DragAndDrop from './components/dragAndDrop';

// const socket = io('http://127.0.0.1:5000');

// /**
//  * The main App component.
//  * Handles image selection, uploading, and recognition.
//  */
// function App() {
//   // State variables
//   const [selectedImage, setSelectedImage] = useState(null); // The selected image file
//   const [plateNumber, setPlateNumber] = useState(''); // The recognized plate number

//   // Set up socket connection and event handler
//   useEffect(() => {
//     /**
//      * Event handler for the 'plate_recognized' event.
//      * Updates the plate number state with the received data.
//      *
//      * @param {Object} data - The received data with the plate number.
//      */
//     const handlePlateRecognized = (data) => {
//       // console.log('Plate recognized:', data.plate_number);
//       setPlateNumber(data.plate_number);
//     };

//     // Set up socket event listener
//     socket.on('plate_recognized', handlePlateRecognized);

//     // Cleanup function to remove event listener
//     return () => {
//       socket.off('plate_recognized', handlePlateRecognized);
//     };
//   }, []);

//   /**
//    * Event handler for the image selection.
//    * Updates the selected image state with the selected image file.
//    *
//    * @param {File} image - The selected image file.
//    */
//   const handleImageChange = (image) => {
//     setSelectedImage(image);
//   };

//   /**
//    * Event handler for the submit button click.
//    * Sends the selected image to the server for recognition.
//    *
//    * @param {Event} event - The submit event.
//    */
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Create a FormData object with the selected image
//     const formData = new FormData();
//     formData.append('image', selectedImage);

//     try {
//       // Send the form data to the server
//       await axios.post('http://127.0.0.1:5000/api/upload', formData);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   return (
//     <div>
//       <h1 className='title'>Number Plate Recognition</h1>
//       {/* Render the DragAndDrop component with the imageFile prop */}
//       <DragAndDrop imageFile={handleImageChange} />
//       <button className='submit' onClick={handleSubmit}>
//         Upload and Recognise
//       </button>
//       {/* Display the recognized plate number if available */}
//       {plateNumber && <div className='plate-number'>Recognised Plate Number: {plateNumber}</div>}
//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

// const ENDPOINT = "http://localhost:5000";
const ENDPOINT = "http://127.0.0.1:5000";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('random_number', (data) => {
      setRandomNumber(data.number);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Number: {randomNumber}</h1>
      </header>
    </div>
  );
}

export default App;
