import React, { useState } from 'react';
import './AmountSelection.css';
import PropTypes from 'prop-types';


const AmountSelection = ({ selectedAmount, onAmountSelection, toggleAmountSelectionModal }) => {
  const [isCustomAmountSelected, setIsCustomAmountSelected] = useState(false);

  const handleChangeAmount = (event) => {
    event.preventDefault();
    onAmountSelection(event.target.value);
  };

  const handleFullTank = (event) => {
    event.preventDefault();
    onAmountSelection(-1);
    toggleAmountSelectionModal(false);
  };

  return (
    <div>
      <div className="amount-header">
        <h3>Select your amount</h3>
      </div>
      <div className="amount-form">
        {!isCustomAmountSelected && (
          <div className="amount-type">
            <button
              className="amount-button"
              onClick={() => setIsCustomAmountSelected(true)}
            >
              Custom Amount
            </button>
            <button
              className="full-tank-button"
              onClick={handleFullTank}
            >
              Full Tank
            </button>
          </div>
        )}
        {isCustomAmountSelected && (
          <div className="amount-input">
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={selectedAmount}
              onChange={handleChangeAmount}
            />
            <button onClick={() => toggleAmountSelectionModal(false)}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
};

AmountSelection.propTypes = {
    selectedAmount: PropTypes.string.isRequired,
    onAmountSelection: PropTypes.func.isRequired,
    toggleAmountSelectionModal: PropTypes.func.isRequired
};

export default AmountSelection;
