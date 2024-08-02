import React, {useState} from 'react';
import './Welcome.css';
import PropTypes from 'prop-types';

const Welcome = ({ name, numberPlate }) => {
    // const [name, setName] = React.useState("");
    // const [numberPlate, setNumberPlate] = React.useState("");
    const [inputOtp, setInputOtp] = useState("");

    const validOtp = 1234;

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
                <p className='otp'>
                    Please enter your OTP
                </p>
                <input
                    type="number"
                    value={inputOtp}
                    onChange={(e) => setInputOtp(e.target.value)}
                />
                <button
                    onClick={() => {
                        if (inputOtp === validOtp) {
                            alert("Welcome");
                        } else {
                            alert("Invalid OTP");
                        }
                    }}
                >
                    Verify
                </button>
            </div>
        </div >
    );
};

Welcome.propTypes = {
    numberPlate: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired
  };

export default Welcome;
