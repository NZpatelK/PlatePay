import { useState } from 'react';
import './dragAndDrop.css';
import PropTypes from 'prop-types';

/**
 * DragAndDrop component is responsible for handling image upload and drag and drop functionality.
 * It uses React hooks to manage state and renders a drag and drop area and a file input field.
 *
 * @param {function} imageFile - A function that takes an image file and is called when an image is uploaded.
 * @returns {JSX.Element} - The rendered DragAndDrop component.
 */
const DragAndDrop = ({ imageFile }) => {
  // State variables to manage the drag and drop area and image upload
  const [isDraggedOver, setIsDraggedOver] = useState(false); // Whether the drag and drop area is being hovered over
  const [imageDataUrl, setImageDataUrl] = useState(''); // The data URL of the uploaded image
  const [isImageUploaded, setIsImageUploaded] = useState(false); // Whether an image has been uploaded

  /**
   * Event handler for the 'dragover' event. Prevents the default behavior and sets isDraggedOver to true.
   *
   * @param {Event} event - The dragover event.
   */
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggedOver(true);
  };

  /**
   * Event handler for the 'dragleave' event. Prevents the default behavior and sets isDraggedOver to false.
   *
   * @param {Event} event - The dragleave event.
   */
  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDraggedOver(false);
  };

  /**
   * Event handler for the 'drop' event. Prevents the default behavior, retrieves the dropped image,
   * calls the imageFile function with the image, sets the imageDataUrl and isImageUploaded state variables,
   * and sets isDraggedOver to false.
   *
   * @param {Event} event - The drop event.
   */
  const handleDrop = (event) => {
    event.preventDefault();
    const image = event.dataTransfer.files[0];
    imageFile(image);
    setImageDataUrl(URL.createObjectURL(image));
    setIsImageUploaded(true);
    setIsDraggedOver(false);
  };

  /**
   * Event handler for the 'click' event of the delete button. Sets the imageDataUrl and isImageUploaded
   * state variables to their initial values.
   */
  const handleDelete = () => {
    setImageDataUrl('');
    setIsImageUploaded(false);
  };

  return (
    <div className="dragger-wrapper">
      {/* The drag and drop area */}
      <div
        className={`dragger ${isImageUploaded ? 'active' : ''}`}
        id="dragger"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isImageUploaded ? (
          // If an image has been uploaded, display the image
          <img src={imageDataUrl} alt="" />
        ) : (
          <>
            {/* If no image has been uploaded, display a message and a file input field */}
            <h2>{isDraggedOver ? 'Release to Upload Image' : 'Drag and Drop Files'}</h2>
            <h3>or</h3>

            <button className="browse-file" id="browse-file">
              Browse File
            </button>
            <input type="file" hidden id="file-input-field" />
          </>
        )}
      </div>
      {/* The delete button */}
      <div className="file-name" id="file-name">
        {isImageUploaded ? (
          <i className="fas fa-trash-can" onClick={handleDelete}>
            delete
          </i>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

DragAndDrop.propTypes = {
    imageFile: PropTypes.instanceOf(File)
};


export default DragAndDrop;
