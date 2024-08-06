import React, { useState } from 'react';
import './PetrolSelection.css';
import PropTypes from 'prop-types';


const PetrolSelection = ({ handlePetrolTypeSelection, togglePetrolSelectionModal }) => {

    const handleOnClick = (event) => {
        event.preventDefault();
        handlePetrolTypeSelection(event.target.textContent);
        togglePetrolSelectionModal(false);
    };
    return (
        <div>
            <div className='petrol-header'>
                <h3>Select your petrol type</h3>
            </div>

            <form className='petrol-form'>
                <div className='petrol-type'>
                    <button onClick={handleOnClick}>Petrol</button>
                    <button onClick={handleOnClick}>Diesel</button>
                    <button onClick={handleOnClick}>LPG</button>
                    <button onClick={handleOnClick}>CNG</button>
                </div>
            </form>
        </div>
    );
};

PetrolSelection.propTypes = {
    selectedPetrol: PropTypes.string.isRequired,
    handlePetrolTypeSelection: PropTypes.func.isRequired,
    togglePetrolSelectionModal: PropTypes.func.isRequired
};

export default PetrolSelection;
