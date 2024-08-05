import React from 'react';
import PropTypes from 'prop-types';
// import './confirmation.css';

const Confirmation = ({
    name,
    numberPlate,
    petrolType,
    selectedAmount,
    isComfirmed,
}) => {
    return (
        <div className="confirmBox">
            <h1>Confirmation</h1>
            <p className="name">{name} </p>
            <p className="numberPlate">{numberPlate}</p>
            <p className="petrolType">{petrolType}</p>
            <p className="selectedAmount">Selected Amount: {selectedAmount === -1 ? "Full Tank" : selectedAmount}</p>
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
};

export default Confirmation;
