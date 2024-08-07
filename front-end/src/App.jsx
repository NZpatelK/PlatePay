import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Welcome from './components/Welcome';
import PetrolSelection from './components/PetrolSelection';
import AmountSelection from './components/AmountSelection';
import Confirmation from './components/Confirmation';


function App() {
  const [user, setUser] = useState({
    name: "",
    numberPlate: "",
    balance: 0,
    defaultAmount: 0,
    petrolType: "",
    isScanned: false,
    isRecognized: false,
    isRegistered: false,
    isOtpValid: false,
    isPetrolSelectionOpen: false,
    isAmountSelectionOpen: false,
  });

  const debtLimit = -200;

  const socket = io("http://127.0.0.1:5000");

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("get_data");
    });

    socket.on("new_data", (data) => {
      setUser((prevUser) => ({
        ...prevUser,
        ...data,
        isScanned: true,
        isRecognized: data.recognized,
        isRegistered: data.registered,
      }));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleGetData = () => {
    setUser((prevUser) => ({
      ...prevUser,
      isScanned: false,
      isRecognized: false,
      isRegistered: false,
      isOtpValid: false,
    }));

    socket.emit("get_data");
  };

  const completeProcess = () => {
    setUser((prevUser) => ({
      ...prevUser,
      isScanned: false,
      isRecognized: false,
      isRegistered: false,
      isOtpValid: false,
    }));

    alert(`Now you can pump ${user.petrolType} in your car`);
    alert(`Your remaining balance is ${user.balance - user.defaultAmount}`);

    socket.emit("get_data");
  };

  const handleSubmitNumberPlate = (numberPlate) => {
    socket.emit("number_plate_input", numberPlate);
  };

  const toggleModal = (modalType) => {
    if (modalType === "petrol") {
      setUser((prevUser) => ({
        ...prevUser,
        isPetrolSelectionOpen: !prevUser.isPetrolSelectionOpen,
      }));
    } else if (modalType === "amount") {
      setUser((prevUser) => ({
        ...prevUser,
        isAmountSelectionOpen: !prevUser.isAmountSelectionOpen,
      }));
    }
  };

  return (
    <div>
      <h1 className="heading">Gas Patel</h1>

      {!user.isScanned ? (
        <div className="box">
          <h1>Welcome</h1>
          <h3>We are currently scanning your number plate.</h3>
          <h3>Please wait...</h3>
        </div>
      ) : !user.isRecognized ? (
        <div className="box">
          <h1>Welcome</h1>
          <div className="sub-box">
            <h3>Sorry, we could not recognize your number plate.</h3>
            <h3>Please enter your number plate</h3>
          </div>
          <input
            type="text"
            value={user.numberPlate}
            onChange={(e) => setUser((prevUser) => ({ ...prevUser, numberPlate: e.target.value }))}
          />
          <button onClick={() => handleSubmitNumberPlate(user.numberPlate)}>Submit</button>
        </div>
      ) : !user.isRegistered ? (
        <div className="box">
          <h1>Welcome</h1>
          <h3>Sorry, you are not registered in our system.</h3>
          <h3>Please download our app and register it.</h3>
          <button onClick={handleGetData}>Exit</button>
        </div>
      ) : user.balance > debtLimit ? (
        <div className="box">
          {!user.isOtpValid && (
            <Welcome
              isOtpValid={setUser((prevUser) => ({ ...prevUser, isOtpValid: true }))}
              name={user.name}
              numberPlate={user.numberPlate}
            />
          )}
          {user.isOtpValid &&
            !user.isAmountSelectionOpen &&
            !user.isPetrolSelectionOpen && (
              <Confirmation
                petrolType={user.petrolType}
                Amount={user.defaultAmount}
                handleModalChange={toggleModal}
                isConfirmed={completeProcess}
              />
            )}

          {user.isPetrolSelectionOpen && (
            <PetrolSelection
              handlePetrolTypeSelection={(petrolType) =>
                setUser((prevUser) => ({ ...prevUser, petrolType }))
              }
              togglePetrolSelectionModal={() =>
                setUser((prevUser) => ({ ...prevUser, isPetrolSelectionOpen: false }))
              }
            />
          )}
          {user.isAmountSelectionOpen && (
            <AmountSelection
              Amount={user.defaultAmount}
              onAmountSelection={(amount) =>
                setUser((prevUser) => ({ ...prevUser, defaultAmount: amount }))
              }
              toggleAmountSelectionModal={() =>
                setUser((prevUser) => ({ ...prevUser, isAmountSelectionOpen: false }))
              }
            />
          )}
        </div>
      ) : (
        <div className="box">
          <h3>Hi {user.name},</h3>
          <h3>Your number plate: {user.numberPlate}</h3>
          <h3>Your balance is insufficient.</h3>
          <h3>Please top up through our app to serve you.</h3>
          <button onClick={handleGetData}>Exit</button>
        </div>
      )}
    </div>
  );
}

export default App;
