import React from 'react';
import PropTypes from 'prop-types';
import './Confirmation.css';

const Confirmation = ({
    name,
    numberPlate,
    petrolType,
    selectedAmount,
    isComfirmed,
    handleModalChange,
}) => {
    return (
        <div className="confirmBox">
            <h1>Confirmation</h1>
            <div className="details">
                <p className="name"> Name: {name} </p>
                <p className="numberPlate"> Number Plate: {numberPlate}</p>

                <div className="pertol-type changable">
                    <p className="petrolType"> Petrol Type: {petrolType}</p>
                    <button onClick={() => handleModalChange("petrol")}>Change</button>
                </div>

                <div className="amount changable">
                    <p className="selectedAmount">Selected Amount: {selectedAmount === -1 ? "Full Tank" : selectedAmount}</p>
                    <button onClick={() => handleModalChange("amount")}>Change</button>
                </div>

            </div>
 
            <div className='confirmation-button'>
                <button onClick={() => isComfirmed(true)}>Confirm</button>
            </div>
        </div>
    );
};

Confirmation.propTypes = {
    name: PropTypes.string.isRequired,
    numberPlate: PropTypes.string.isRequired,
    petrolType: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    selectedAmount: PropTypes.string.isRequired,
    isComfirmed: PropTypes.bool.isRequired,
    handleModalChange: PropTypes.func.isRequired
};

export default Confirmation;
