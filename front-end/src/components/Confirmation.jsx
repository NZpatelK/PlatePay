import React from 'react';
import PropTypes from 'prop-types';
import './Confirmation.css';

const Confirmation = ({
    petrolType,
    selectedAmount,
    isComfirmed,
    handleModalChange,
}) => {
    return (
        <div className="confirmBox">
            <h1>Confirmation</h1>
            <div className="details">
                <div className="pertol-type changable">
                    <h5 className="petrolType"> Petrol Type: {petrolType}</h5>
                    <button onClick={() => handleModalChange("petrol")}>Change</button>
                </div>

                <div className="amount changable">
                    <h5 className="selectedAmount">Selected Amount: {selectedAmount === -1 ? "Full Tank" : "$" + selectedAmount}</h5>
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
    petrolType: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    selectedAmount: PropTypes.string.isRequired,
    isComfirmed: PropTypes.bool.isRequired,
    handleModalChange: PropTypes.func.isRequired
};

export default Confirmation;
