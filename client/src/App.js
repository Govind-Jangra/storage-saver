import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import myVideo from "./assets/space.mp4"
function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();




  const uploadFile = async (data) => {
    try {
        const response = await axios.post(`/upload`, data);
        return response.data;
    } catch (error) {
        console.log('Error of api ', error.message);
    }
}
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  return (
    <>
       <div className="relative">
      <video
        className="absolute z-0 w-full h-100% object-cover"
        autoPlay
        muted
        loop
      >
        <source src={myVideo} type="video/mp4" />
      </video>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
  <div className="bg-white bg-opacity-75 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 w-1/4">
    <h2 className="text-2xl font-bold mb-4">Upload your file</h2>
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={() => onUploadClick()}
    >
      Choose File
    </button>
    <input
      type="file"
      ref={fileInputRef}
      className="hidden"
      onChange={(e) => setFile(e.target.files[0])}
    />
    <a href={result} target='_blank' className="text-blue-500">{result}</a> 
  </div>
</div>

    </div>
      
    </>
  );
}

export default App;
