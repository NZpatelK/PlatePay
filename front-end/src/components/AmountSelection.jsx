import React, { useState } from 'react';
import './AmountSelection.css';
import PropTypes from 'prop-types';

const AmountSelection = ({ selectedAmount, handleAmountSelection }) => {
    const [isChanged, setIsChanged] = useState(false);

    return (
        <div>
            <div className='amount-header'>
                <h3>
                    Select your amount
                </h3>
            </div>
            {isChanged ?
                <form className='amount-form'>
                    <div className='amount-type'>
                        <label>
                            <input type="radio" name="amount" value="Full Tank" onChange={handleAmountSelection} />
                            Full Tank
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="amount" value="Custom Amount" onChange={handleAmountSelection} />
                            Custom Amount
                        </label>
                    </div>
                    <br />
                    {selectedAmount === 'Custom Amount' ?
                        <div className='amount-input'>
                            <input type="number" name="amount" placeholder="Amount" onChange={handleAmountSelection} />
                        </div>
                        :
                        null
                    }
                    <br />
                    <button onClick={() => setIsChanged(false)}>Submit</button>
                </form>

                :

                <button onClick={() => setIsChanged(true)}>Change</button>
            }
        </div>
    );
};

AmountSelection.propTypes = {
    selectedAmount: PropTypes.string.isRequired,
    handleAmountSelection: PropTypes.func.isRequired
};

export default AmountSelection;
