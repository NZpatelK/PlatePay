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
  const [petrolType, setPetrolType] = useState("LPG");
  const [balance, setBalance] = useState(400);
  const [selectedAmount, setSelectedAmount] = useState(0);


  //number plate
  const [numberPlate, setNumberPlate] = useState("");
  const [isScanned, setIsScanned] = useState(true);
  const [isRecongized, setIsRecongized] = useState(true);
  const [isRegistered, setIsRegistered] = useState(true);

  // Validate 
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [isPetrolOpen, setIsPetrolOpen] = useState(false);
  const [isAmountOpen, setIsAmountOpen] = useState(false);




  const debtLimit = -200;
  // const lowBalance = 50;

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

  const completeProcess = () => {
    isScanned(false);
    setIsRecongized(false);
    setIsRegistered(false);
    setIsOtpValid(false);

    socket.emit('get_data');

    // setTimeout(() => {
    //   fetchData();
    // }, 5000);
  }



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

      {!isScanned ? (
        <div className='box'>
          <h1>Welcome</h1>
          <h3>We are currently scanning your number plate.</h3>
          <h3>Please wait.....</h3>
        </div>
      ) : !isRecongized ? (
        <div className='box'>
          <h1>Welcome</h1>
          <h3>Sorry we could not recognize your number plate.</h3>
          <h3>Please enter your number plate</h3>
          <input type="text" value={numberPlate} onChange={(e) => setNumberPlate(e.target.value)} />
        </div>
      )
        : !isRegistered ? (
          <div className='box'>
            <h1>Welcome</h1>
            <h3>Sorry you are not registered at our system.</h3>
            <h3>Please download our app and register it.</h3>
          </div>
        )
          :
          balance > debtLimit ? <div className='box'>
            {!isOtpValid && <Welcome isOtpValid={setIsOtpValid} name={name} numberPlate={numberPlate} />}
            {isOtpValid && !isAmountOpen && !isPetrolOpen && <Confirmation petrolType={petrolType} selectedAmount={selectedAmount} handleModalChange={toggleModal} isComfirmed={setIsComfirmed} />}

            {isPetrolOpen && <PetrolSelection handlePetrolTypeSelection={setPetrolType} togglePetrolSelectionModal={setIsPetrolOpen} />}
            {isAmountOpen && <AmountSelection selectedAmount={selectedAmount} onAmountSelection={setSelectedAmount} toggleAmountSelectionModal={setIsAmountOpen} />}

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
