import React, {useState} from 'react';
import './Welcome.css';
import PropTypes from 'prop-types';

const Welcome = ({ name, numberPlate, isOtpValid }) => {
    const [inputOtp, setInputOtp] = useState("");

    const handleOtp = (e) => {
        e.preventDefault();

        if (inputOtp === "1234") {
            isOtpValid(true);
        } else {
            alert("Invalid OTP");
        }

        setInputOtp("");
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
                    onKeyDown={(e) => e.key === "Enter" && handleOtp(e)}
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
