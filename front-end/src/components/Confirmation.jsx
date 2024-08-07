import React from 'react';
import PropTypes from 'prop-types';
import './Confirmation.css';

const Confirmation = ({
    petrolType,
    Amount,
    isComfirmed,
    handleModalChange,
}) => {
    const fullTankText = Amount === -1 ? "Full Tank" : `$${Amount}`;

    return (
        <div className="confirmBox">
            <h1>Confirmation</h1>
            <div className="details">
                <div className="pertol-type changable">
                    <h5 className="petrolType">
                        Petrol Type: {petrolType}
                    </h5>
                    <button onClick={() => handleModalChange("petrol")}>Change</button>
                </div>

                <div className="amount changable">
                    <h5 className="Amount">
                        Selected Amount: {fullTankText}
                    </h5>
                    <button onClick={() => handleModalChange("amount")}>Change</button>
                </div>

            </div>
 
            <div className='confirmation-button'>
                <button onClick={isComfirmed}>Confirm</button>
            </div>
        </div>
    );
};

Confirmation.propTypes = {
    petrolType: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    Amount: PropTypes.string.isRequired,
    isComfirmed: PropTypes.bool.isRequired,
    handleModalChange: PropTypes.func.isRequired
};

export default Confirmation;
