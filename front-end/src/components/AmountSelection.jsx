import React, { useState } from 'react';
import './AmountSelection.css';
import PropTypes from 'prop-types';


const AmountSelection = ({ Amount, onAmountSelection, toggleAmountSelectionModal }) => {
  const [isCustomAmountSelected, setCustomAmountSelected] = useState(false);

  const handleAmountChange = (event) => {
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
              onClick={() => setCustomAmountSelected(true)}
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
              value={Amount}
              onChange={handleAmountChange}
            />
            <button onClick={() => toggleAmountSelectionModal(false)}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
};

AmountSelection.propTypes = {
    Amount: PropTypes.string.isRequired,
    onAmountSelection: PropTypes.func.isRequired,
    toggleAmountSelectionModal: PropTypes.func.isRequired
};

export default AmountSelection;
