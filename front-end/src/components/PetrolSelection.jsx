
import './PetrolSelection.css';
import PropTypes from 'prop-types';


const PetrolSelection = ({ handlePetrolTypeSelection, togglePetrolSelectionModal }) => {
  const petrolTypes = ['91', '95', '98', 'Diesel', 'LPG'];

  const handleOnClick = (petrolType) => (event) => {
    event.preventDefault();
    handlePetrolTypeSelection(petrolType);
    togglePetrolSelectionModal("petrol");
  };

  return (
    <div>
      <div className='petrol-header'>
        <h3>Select your petrol type</h3>
      </div>

      <form className='petrol-form'>
        <div className='petrol-type'>
          {petrolTypes.map((petrolType) => (
            <button
              key={petrolType}
              onClick={handleOnClick(petrolType)}
              style={{ background: getPetrolColor(petrolType) }}
            >
              {petrolType}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

const getPetrolColor = (petrolType) => {
  const colors = {
    '91': '#008000',
    '95': '#FFD700',
    '98': '#FF0000',
    Diesel: '#000000',
    LPG: '#0000FF',
  };

  return colors[petrolType] || '#000000';
};

PetrolSelection.propTypes = {
    selectedPetrol: PropTypes.string.isRequired,
    handlePetrolTypeSelection: PropTypes.func.isRequired,
    togglePetrolSelectionModal: PropTypes.func.isRequired
};

export default PetrolSelection;
