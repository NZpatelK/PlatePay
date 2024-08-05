import React, { useState } from 'react';
import './AmountSelection.css';
import PropTypes from 'prop-types';

const AmountSelection = ({ selectedAmount, handleAmountSelection, hasSelectedAmount }) => {
    const [isSelectedCustomAmount, setIsSelectedCustomAmount] = useState(false);

    const handleChangeAmount = (event) => {
        event.preventDefault();
        handleAmountSelection(event.target.value);
    }


    return (
        <div>
            <div className='amount-header'>
                <h3>
                    Select your amount
                </h3>
            </div>
                <div className='amount-form'>
                    {!isSelectedCustomAmount && <div className='amount-type'>
                        <button className='amount-button' onClick={() => setIsSelectedCustomAmount(true)}>Custom Amount</button>
                        <button className='fullTank-button' >Full Tank</button>
                    </div>}
            
                    {isSelectedCustomAmount &&
                        <div className='amount-input'>
                            <input type="number" name="amount" placeholder="Amount" value={selectedAmount} onChange={handleChangeAmount} />
                            <button onClick={() => (hasSelectedAmount(true))}>Submit</button>
                        </div>      
                    }
                </div>
        </div>
    );
};

AmountSelection.propTypes = {
    selectedAmount: PropTypes.string.isRequired,
    handleAmountSelection: PropTypes.func.isRequired
};

export default AmountSelection;
