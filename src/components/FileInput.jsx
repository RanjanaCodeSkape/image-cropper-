import React, { useRef } from 'react';

const FileInput = ({ onImageSelected }) => {
  const inputRef = useRef();

  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = function (e) {
        onImageSelected(reader.result, selectedFile); 
      };
    }
  };

  const onChooseImg = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: "none" }}
      />
      <button className="border-1 bg-[#3d405b] text-white p-2 rounded-lg" onClick={onChooseImg}>
        Choose Image
      </button>
    </div>
  );
};

export default FileInput;
