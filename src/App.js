
import './App.css';
import ImageCropper from './components/ImageCropper';
import FileInput from './components/FileInput';
import { useState } from 'react';

function App() {
  const [image, setImage] = useState('');
  const [currentPage, setCurrentPage] = useState('choose-img');
  const [imageAfterCrop, setImgAfterCrop] = useState('');

  const onImageSelected = (selectedImage) => {
    setImage(selectedImage);
    setCurrentPage('crop-img');
  };

  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement('canvas');
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;
    const context = canvasEle.getContext('2d');
    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );
      const dataURL = canvasEle.toDataURL('image/jpeg');
      setImgAfterCrop(dataURL);
      setCurrentPage('img-cropped');
    };
  };

  const onCropCancel = () => {
    setCurrentPage('choose-img');
    setImage('');
  };

  return (
    <div className="container">
      {currentPage === 'choose-img' ? (
        <FileInput onImageSelected={onImageSelected} />
      ) : currentPage === 'crop-img' ? (
        <ImageCropper
          image={image}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      ) : currentPage === 'img-cropped' ? (
        <>
          <div>
            <img src={imageAfterCrop} className="cropped-img" alt="" />
          </div>
          <button onClick={() => setCurrentPage('crop-img')} className="btn">
            Crop Again
          </button>
          <button
            onClick={() => {
              setCurrentPage('choose-img');
              setImage('');
            }}
            className="btn"
          >
            New Image
          </button>
        </>
      ) : null}
    </div>
  );
}

export default App;
