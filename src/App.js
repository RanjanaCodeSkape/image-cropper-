import './App.css';
import ImageCropper from './components/ImageCropper';
import FileInput from './components/FileInput';
import { useState } from 'react';


function App() {
  const [image, setImage] = useState('');
  const [originalFile, setOriginalFile] = useState(null); 
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [imageAfterCrop, setImgAfterCrop] = useState("");

  const onImageSelected = (selectedImage, selectedFile) => {
    setImage(selectedImage);
    setOriginalFile(selectedFile);
    setCurrentPage("crop-img");
    console.log("Original File:", selectedFile); 
  };

  const dataURLToFile = (dataUrl, filename) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], filename, { type: mime });


    console.log("File After Cropping:", file);

    return file;
  };

  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;
    const context = canvasEle.getContext("2d");
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
      const dataURL = canvasEle.toDataURL("image/jpeg");

      // Use the original file name here
      const croppedFile = dataURLToFile(dataURL, originalFile.name);
      setImgAfterCrop(URL.createObjectURL(croppedFile)); // Show the cropped image
      setCurrentPage("img-cropped");
    };
  };

  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
  };

  return (
    <div className="container">
      {
        currentPage === "choose-img" ? (
          <FileInput onImageSelected={onImageSelected} />
        ) : currentPage === "crop-img" ? (
          <ImageCropper
            image={image}
            onCropDone={onCropDone}
            onCropCancel={onCropCancel}
          />
        ) : (
          <>
          <div className='w-full flex justify-center'>
          <div className=' w-[50%] flex flex-col justify-center items-center'>
            <div>
              <img src={imageAfterCrop} className='cropped-img' alt='' />
            </div>
            <button onClick={() => { setCurrentPage("crop-img") }} className='border-1 bg-[#3d405b] text-white p-2 rounded-lg'>
              Crop
            </button>
            <button onClick={() => { setCurrentPage("choose-img"); setImage("") }} className='border-1 bg-[#3d405b] text-white p-2 rounded-lg'>
              New Image
            </button>
            </div>
            </div>
          </>
        )
      }
    </div>
  );
}

export default App;





// import './App.css';
// import ImageCropper from './components/ImageCropper';
// import FileInput from './components/FileInput';
// import { useState } from 'react';

// function App() {
//   const [image, setImage] = useState('');
//   const [currentPage, setCurrentPage] = useState('choose-img');
//   const [imageAfterCrop, setImgAfterCrop] = useState('');

//   const onImageSelected = (selectedImage) => {
//     setImage(selectedImage);
//     setCurrentPage('crop-img');
//   };

//   const onCropDone = (imgCroppedArea) => {
//     const canvasEle = document.createElement('canvas');
//     canvasEle.width = imgCroppedArea.width;
//     canvasEle.height = imgCroppedArea.height;
//     const context = canvasEle.getContext('2d');
//     let imageObj1 = new Image();
//     imageObj1.src = image;
//     imageObj1.onload = function () {
//       context.drawImage(
//         imageObj1,
//         imgCroppedArea.x,
//         imgCroppedArea.y,
//         imgCroppedArea.width,
//         imgCroppedArea.height,
//         0,
//         0,
//         imgCroppedArea.width,
//         imgCroppedArea.height
//       );
//       const dataURL = canvasEle.toDataURL('image/jpeg');
//       setImgAfterCrop(dataURL);
//       setCurrentPage('img-cropped');
//       console.log('Cropped Image URL:', dataURL.res);
//     };
//   };

//   const onCropCancel = () => {
//     setCurrentPage('choose-img');
//     setImage('');
//   };

//   return (
//     <div className="container ">
//       <div className=" ">
//       {currentPage === 'choose-img' ? (
//         <FileInput onImageSelected={onImageSelected} />
//       ) : currentPage === 'crop-img' ? (
//         <ImageCropper
//           image={image}
//           onCropDone={onCropDone}
//           onCropCancel={onCropCancel}
//         />
//       ) : currentPage === 'img-cropped' ? (
//         <>
       
//         <div className='flex flex-col justify-center items-center mt-5 mb-5'>
//           <div  className='w-[37%] flex flex-col '>
//             <img src={imageAfterCrop} className="cropped-img " alt="" />
//           </div>
//           <button onClick={() => setCurrentPage('crop-img')} className="w-[20%] mt-2 mb-2 border-1 bg-[#3d405b] text-white p-2 rounded-lg">
//             Crop Again
//           </button>
//           <button
//             onClick={() => {
//               setCurrentPage('choose-img');
//               setImage('');
//             }}
//             className="w-[20%] border-1 bg-[#3d405b] text-white p-2 rounded-lg"
//           >
//             New Image
//           </button>
//           </div>
       
//         </>
//       ) : null}
//       </div>
//     </div>
//   );
// }

// export default App;



