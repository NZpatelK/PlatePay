import React from 'react';
import './Welcome.css';
import PropTypes from 'prop-types';

const Welcome = ({ name, numberPlate }) => {
    // const [name, setName] = React.useState("");
    // const [numberPlate, setNumberPlate] = React.useState("");
    const [inputOtp, setInputOtp] = React.useState("");
    
    const validOtp = 1234;


    return (
        <div>
            <h1 className='welcome-header'>Welcome</h1>
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
            </div>
        </div >
    );
};

Welcome.propTypes = {
    numberPlate: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired
  };

export default Welcome;
