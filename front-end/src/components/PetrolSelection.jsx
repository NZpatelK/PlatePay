import React, { useState } from 'react';
import './PetrolSelection.css';
import PropTypes from 'prop-types';

const PetrolSelection = ({ handlePetrolSelection, isPetrolOpen }) => {

    const handlePetrolSubmit = (event) => {
        event.preventDefault();
        isPetrolOpen(false);
    }

    return (
        <div>
            <div className='petrol-header'>
                <h3>
                    Select your petrol type
                </h3>
            </div>

            <form className='petrol-form'>
                <div className='petrol-type'>
                    <label>
                        <input type="radio" name="petrol" value="Petrol" onChange={handlePetrolSelection} />
                        Petrol
                    </label>
                    <br />
                    <label>
                        <input type="radio" name="petrol" value="Diesel" onChange={handlePetrolSelection} />
                        Diesel
                    </label>
                    <br />
                    <label>
                        <input type="radio" name="petrol" value="LPG" onChange={handlePetrolSelection} />
                        LPG
                    </label>
                    <br />
                    <label>
                        <input type="radio" name="petrol" value="CNG" onChange={handlePetrolSelection} />
                        CNG
                    </label>
                </div>
                <br />
                <button onClick={handlePetrolSubmit}>Submit</button>
            </form>
        </div>
    );
};

PetrolSelection.propTypes = {
    selectedPetrol: PropTypes.string.isRequired,
    handlePetrolSelection: PropTypes.func.isRequired,
    isPetrolOpen: PropTypes.func.isRequired
};

export default PetrolSelection;
