import React, {useState} from 'react';
import './Welcome.css';
import PropTypes from 'prop-types';

const Welcome = ({ name, numberPlate, isOtpValid }) => {
    // const [name, setName] = React.useState("");
    // const [numberPlate, setNumberPlate] = React.useState("");
    const [inputOtp, setInputOtp] = useState("");

    const validOtp = 1234;
    
    const handleOtp = (e) => {
        e.preventDefault();

        const regex = new RegExp(`^${validOtp}$`);
        if (regex.test(inputOtp)) {
            isOtpValid(true);
            alert("Valid OTP");
        } else {
            alert("Invalid OTP");
        }
    }

    return (
        <div>
            <div>
               <div className='welcome-heading'>
                    <h3>
                        Hi {name},
                    </h3>
                    <h3>
                        Your number plate: {numberPlate}
                    </h3>
               </div>
                <h5 className='otp'>
                    Please enter your OTP
                </h5>
                <input
                    type="number"
                    value={inputOtp}
                    onChange={(e) => setInputOtp(e.target.value)}
                />
                <button
                    onClick={handleOtp}
                >
                    Verify
                </button>
            </div>
        </div >
    );
};

Welcome.propTypes = {
    numberPlate: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired,
    isOtpValid: PropTypes.func.isRequired
  };

export default Welcome;
