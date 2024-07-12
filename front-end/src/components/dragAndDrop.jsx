import { useState } from 'react';
import './dragAndDrop.css';

const DragAndDrop = () => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadedImage, setUploadedImage] = useState('');
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const image = e.dataTransfer.files[0];
        handleFileUpload(image);
    };

    const handleFileUpload = (file) => {
        const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        if (validExtensions.includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
                setIsImageUploaded(true);
            };
            reader.readAsDataURL(file);
        } else {
            setIsImageUploaded(false);
        }
    };

    const handleDelete = () => {
        setUploadedImage('');
        setIsImageUploaded(false);
    };

    return (
        <div className="dragger-wrapper">
            <div
                className={`dragger ${isImageUploaded ? 'active' : ''}`}
                id="dragger"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {isImageUploaded ? (
                    <img src={uploadedImage} alt="" />
                ) : (
                    <>
                        <h2>{isDragOver ? 'Release to Upload Image' : 'Drag and Drop Files'}</h2>
                        <h3>or</h3>

                        <button className="browse-file" id="browse-file">
                            Browse File
                        </button>
                        <input type="file" hidden id="file-input-field" />
                    </>
                )}
            </div>
            <div className="file-name" id="file-name">
                {isImageUploaded ? (
                    <i className="fas fa-trash-can" onClick={handleDelete}>delete</i>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default DragAndDrop;
