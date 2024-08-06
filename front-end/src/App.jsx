import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Welcome from './components/Welcome';
import PetrolSelection from './components/PetrolSelection';
import AmountSelection from './components/AmountSelection';
import Confirmation from './components/Confirmation';

// const ENDPOINT = "http://127.0.0.1:5000"; // Flask server endpoint

function App() {
  const [name, setName] = useState("patel");
  const [numberPlate, setNumberPlate] = useState("LAC123");
  const [petrolType, setPetrolType] = useState("LPG");
  const [balance, setBalance] = useState(400);
  const [selectedAmount, setSelectedAmount] = useState(0);

  // Validate 
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [isPetrolOpen, setIsPetrolOpen] = useState(false);
  const [isAmountOpen, setIsAmountOpen] = useState(false);
  const [isComfirmed, setIsComfirmed] = useState(false);



  const debtLimit = -200;
  const lowBalance = 50;

  // // Connect to the Socket.IO server
  // const socket = io('http://127.0.0.1:5000');

  // useEffect(() => {

  //   const socket = io('http://127.0.0.1:5000');
  //   // Listen for the 'connect' event
  //   socket.on('connect', () => {
  //     console.log('Connected to server');
  //     socket.emit('get_data'); // Request data from the server
  //   });

  //   // Listen for the 'new_data' event
  //   socket.on('new_data', (data) => {
  //     console.log('New data received:', data);
  //     setNumberPlate(data.number_plate);
  //     setName(data.name);
  //     setBalance(data.balance);
  //     setPetrolType(data.petrol_type);
  //   });

  //   // Listen for the 'disconnect' event
  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from server');
  //   });

  //   // Cleanup on component unmount
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // const fetchData = () => {
  //   socket.emit('get_data');
  // };



  const toggleModal = (modalType) => {
    if (modalType === 'petrol') {
      setIsPetrolOpen(!isPetrolOpen);
    } else if (modalType === 'amount') {
      setIsAmountOpen(!isAmountOpen);
    }
  }

  return (
    <div>
      <h1 className='heading'>Gas Patel</h1>
      {balance > debtLimit ? <div className='box'>
        {!isOtpValid && <Welcome isOtpValid={setIsOtpValid} name={name} numberPlate={numberPlate} />}
        {isOtpValid && !isAmountOpen && !isPetrolOpen && <Confirmation petrolType={petrolType} selectedAmount={selectedAmount} handleModalChange={toggleModal} isComfirmed={setIsComfirmed} />}

        {isPetrolOpen && <PetrolSelection handlePetrolTypeSelection={setPetrolType} togglePetrolSelectionModal={setIsPetrolOpen} />}
        {isAmountOpen && <AmountSelection selectedAmount={selectedAmount} onAmountSelection={setSelectedAmount} toggleAmountSelectionModal={setIsAmountOpen} />}

        {/* <button onClick={fetchData}>Fetch Data</button> */}
      </div> :
      
      <div className='box'>
        <h3>Hi {name}, </h3>
        <h3>Your number plate: {numberPlate}</h3>
        <h3>Your balance is insiffucient.</h3>
        <h3> Please top up through our app then we wil able to serve you</h3>
        

      </div>}
    </div>
  );
}

export default App;
