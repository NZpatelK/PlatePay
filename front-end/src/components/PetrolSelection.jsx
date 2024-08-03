import React, { useState } from 'react';
import './PetrolSelection.css';

const PetrolSelection = ({ selectedPetrol, handlePetrolSelection }) => {

    const [isChanged, setIsChanged] = useState(false);

    // const [selectedPetrol, setSelectedPetrol] = useState('');

    // const handlePetrolSelection = (event) => {
    //     setSelectedPetrol(event.target.value);
    // }

    return (
        <div>
            <div className='petrol-header'>
                <h3>
                    Select your petrol type
                </h3>
            </div>
            {isChanged ?
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
                    <button onClick={() => setIsChanged(false)}>Submit</button>
                </form> 

                :

                <button onClick={() => setIsChanged(true)}>Change</button>
            }
        </div>
    );
};

export default PetrolSelection;
