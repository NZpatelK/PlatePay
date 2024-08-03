import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Welcome from './components/Welcome';
import PetrolSelection from './components/PetrolSelection';

// const ENDPOINT = "http://127.0.0.1:5000"; // Flask server endpoint

function App() {
  const [name, setName] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [petrolType, setPetrolType] = useState("");
  const [balance, setBalance] = useState(0);

  const [isOtpValid, setIsOtpValid] = useState(false);

  const debtLimit = -200;
  const lowBalance = 50;

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
      setNumberPlate(data.number_plate);
      setName(data.name);
      setBalance(data.balance);
      setPetrolType(data.petrol_type);
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

  const checkBalance = () => {
    if (balance < debtLimit) {
      alert("Insufficient balance");
    }
    else if (balance < lowBalance) {
      alert("Balance is low");
    } 
    else {
      alert("Balance is sufficient");
    }
  };

  return (
    <div>
      <h1 className='heading'>Patel Station</h1>
      <div className='box'>
          {/* {!numberPlate && !name && <h2 className='heading'>Welcome</h2>}
          {numberPlate && name && <Welcome name={name} numberPlate={numberPlate}/>} */}
          {!isOtpValid && <Welcome name={name} numberPlate={numberPlate} isOtpValid={setIsOtpValid} />}
          {isOtpValid && <PetrolSelection/>}
          {/* <button onClick={fetchData}>Fetch Data</button> */}
      </div>
    </div>
  );
}

export default App;
