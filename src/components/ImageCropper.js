import { useState } from 'react';
import Cropper from 'react-easy-crop';

const ImageCropper = ({ image, onCropDone, onCropCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onAspectRatioChange = (event) => {
    setAspectRatio(parseFloat(event.target.value)); // Ensure the value is parsed as a float
  };

  return (
    <>
      <div className="cropper">
        <div>
          <Cropper
            image={image}
            aspect={aspectRatio}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                width: '100%',
                height: '80%',
                backgroundColor: '#fff',
              },
            }}
          />
        </div>
        <div className="action-btns">
          <div className="aspect-ratios" onChange={onAspectRatioChange}>
            <label>
              <input type="radio" value={1 / 1} name="aspectRatio" defaultChecked /> 1:1
            </label>
            <label>
              <input type="radio" value={5 / 4} name="aspectRatio" /> 5:4
            </label>
            <label>
              <input type="radio" value={4 / 3} name="aspectRatio" /> 4:3
            </label>
            <label>
              <input type="radio" value={3 / 2} name="aspectRatio" /> 3:2
            </label>
            <label>
              <input type="radio" value={5 / 3} name="aspectRatio" /> 5:3
            </label>
            <label>
              <input type="radio" value={16 / 9} name="aspectRatio" /> 16:9
            </label>
            <label>
              <input type="radio" value={3 / 1} name="aspectRatio" /> 3:1
            </label>
          </div>
          <div className="btn-container">
            <button className="btn btn-outline" onClick={onCropCancel}>
              Cancel
            </button>
            <button className="btn" onClick={() => onCropDone(croppedArea)}>
              Crop & Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
