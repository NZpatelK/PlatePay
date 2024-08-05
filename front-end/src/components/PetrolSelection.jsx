import React, { useState } from 'react';
import './PetrolSelection.css';
import PropTypes from 'prop-types';

const PetrolSelection = ({ selectedPetrol, handlePetrolSelection, hasSelectedPetrol}) => {

    const [isChanged, setIsChanged] = useState(false);


    const handlePetrolSubmit = (event) => {
        event.preventDefault();
        hasSelectedPetrol(true);
    }

    return (
        <div>

            {!isChanged ?

                <>
                    <div className='petrol-header'>
                        <h3>
                            Is that correct that you want to use
                        </h3>
                        <h3>
                           Pertol Type: {selectedPetrol}
                        </h3>
                    </div>

                   <div className='pertol-button'>
                        <button onClick={() => hasSelectedPetrol(true)}>Yes</button>
                        <button onClick={() => setIsChanged(true)}>No</button>
                   </div>
                </>

                :
                <>
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
                </>
            }
        </div>
    );
};

PetrolSelection.propTypes = {
    selectedPetrol: PropTypes.string.isRequired,
    handlePetrolSelection: PropTypes.func.isRequired,
    hasSelectedPetrol: PropTypes.func.isRequired
};

export default PetrolSelection;
