import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Welcome from './components/Welcome';
import PetrolSelection from './components/PetrolSelection';
import AmountSelection from './components/AmountSelection';
import Confirmation from './components/Confirmation';


function App() {
  const [userData, setUserData] = useState({
    name: "",
    petrolType: "",
    balance: 0,
    amount: 0,
    numberPlate: "",
    isScanned: true,
    isRecognized: true,
    isRegistered: true,
    isOtpValid: true,
    isPetrolModalOpen: false,
    isAmountModalOpen: false,
  });

  const debtLimit = -200;

  const socket = io('http://127.0.0.1:5000');

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000');
    const handleNewData = (newData) => {
      setUserData((prevData) => ({ ...prevData, ...newData, isScanned: true }));
    };

    socket.on('connect', () => {
      socket.emit('get_data');
    });

    socket.on('new_data', handleNewData);

    return () => {
      socket.disconnect();
    };
  }, []);

  const getData = async () => {
    await new Promise((resolve) => {
      socket.emit('get_data', resolve);
    });
  };

  const handleSubmitNumberPlate = async (numberPlate) => {
    socket.emit('number_plate_input', numberPlate);
  };

  const toggleModal = (modalType) => {
    if (modalType === "petrol") {
      setUserData((prevData) => ({
        ...prevData,
        isPetrolModalOpen: !prevData.isPetrolModalOpen,
      }));
    } else if (modalType === "amount") {
      setUserData((prevData) => ({
        ...prevData,
        isAmountModalOpen: !prevData.isAmountModalOpen,
      }));
    }
  };

  const completeProcess = async () => {
    setUserData((prevData) => ({
      ...prevData,
      isScanned: false,
      isOtpValid: false,
      isPetrolModalOpen: false,
      isAmountModalOpen: false,
    }));

    alert(`Now you can pump the ${userData.petrolType} in your car`);
    alert(`Your remaining balance is ${userData.balance - userData.amount}`);

    await getData();
  };

  return (
    <div>
      <h1 className="heading">Gas Patel</h1>

      {!userData.isScanned ? (
        <div className="box">
          <h1>Welcome</h1>
          <h3>We are currently scanning your number plate.</h3>
          <h3>Please wait...</h3>
        </div>
      ) : !userData.isRecognized ? (
        <div className="box">
          <h1>Welcome</h1>
          <div className="sub-box">
            <h3>Sorry, we could not recognize your number plate.</h3>
            <h3>Please enter your number plate</h3>
          </div>
          <input
            type="text"
            value={userData.numberPlate}
            onChange={(e) => setUserData((prevData) => ({ ...prevData, numberPlate: e.target.value }))}
          />
          <button onClick={() => handleSubmitNumberPlate(userData.numberPlate)}>Submit</button>
        </div>
      ) : !userData.isRegistered ? (
        <div className="box">
          <h1>Welcome</h1>
          <h3>Sorry, you are not registered at our system.</h3>
          <h3>Please download our app and register it.</h3>
          <button onClick={getData}>Exit</button>
        </div>
      ) : userData.balance > debtLimit ? (
        <div className="box">
          {!userData.isOtpValid && (
            <Welcome
              isOtpValid={(isValid) => setUserData((prevData) => ({ ...prevData, isOtpValid: isValid }))}
              name={userData.name}
              numberPlate={userData.numberPlate}
            />
          )}
          {userData.isOtpValid && !userData.isPetrolModalOpen && !userData.isAmountModalOpen && (
            <Confirmation
              petrolType={userData.petrolType}
              amount={userData.amount}
              handleModalChange={toggleModal}
              isConfirmed={completeProcess}
            />
          )}

          {userData.isPetrolModalOpen && (
            <PetrolSelection handlePetrolTypeSelection={(petrolType) => setUserData((prevData) => ({ ...prevData, petrolType }))} togglePetrolSelectionModal={toggleModal} />
          )}
          {userData.isAmountModalOpen && (
            <AmountSelection amount={userData.amount} onAmountSelection={(amount) => setUserData((prevData) => ({ ...prevData, amount }))} toggleAmountSelectionModal={toggleModal} />
          )}
        </div>
      ) : (
        <div className="box">
          <h3>Hi {userData.name}, </h3>
          <h3>Your number plate: {userData.numberPlate}</h3>
          <h3>Your balance is insufficient.</h3>
          <h3>Please top up through our app then we will be able to serve you</h3>
          <button onClick={getData}>Exit</button>
        </div>
      )}
    </div>
  );
}

export default App;
