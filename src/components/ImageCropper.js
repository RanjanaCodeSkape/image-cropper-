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
    setAspectRatio(parseFloat(event.target.value)); 
  };

  return (
    <>
      <div className="cropper w-full  flex justify-center">
        <div className='flex justify-center items-center w-[50%]'>
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
                width: '50%',
                height: '80%',
                backgroundColor: '#fff',
                
              },
            }}
          />
        </div>
        <div className="action-btns bg-[#f4f1de] fixed top-[84vh] w-[70%] p-3 rounded-lg flex  justify-between items-center">
          <div className="aspect-ratios  flex gap-4" onChange={onAspectRatioChange}>
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
          <div className="btn-container flex gap-3">
            <button className="  border-1 bg-[#3d405b] text-white p-2 rounded-lg" onClick={onCropCancel}>
              Cancel
            </button>
            <button className=" border-1 bg-[#3d405b] text-white p-2 rounded-lg " onClick={() => onCropDone(croppedArea)}>
              Crop & Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
