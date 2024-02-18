import { useState, useEffect, useRef, Suspense } from "react";
import "./App.css";
import Nab from "./Nab.jsx";
import Intro from "./intro.mp4";
import FileUploadComponent from "./Uploader.jsx";

// Following https://aps.autodesk.com/en/docs/reality-capture/v1/tutorials/create-3d-mesh-from-photos/
function App() {

  const dbURL = "https://pub-8fdcfc93cb6149e48647d45b07b5e003.r2.dev/src/testdata/";
  const [videoUrl, setVideoUrl] = useState(dbURL + "sparkling.glb");


  // const handleFileUpload = (file) => {
  //   console.log("Updating File")
  //   // Here you would handle the file upload logic
  //   // For now, just update the video URL with a new URL
  //   setVideoUrl(dbURL + "poly.glb");
  // };

  // const handleVideoUpload = (file) => {
  //   console.log("Updating File")
  //   // Here you would handle the file upload logic
  //   // For now, just update the video URL with a new URL
  //   setVideoUrl(dbURL + "poly.glb");
  // };

  return (
    <div className="colContainer">
      {/* Left Column */}
      <div className="leftColumn">
        {/* Nab */}
        <Nab videoURL={videoUrl}></Nab>
        {/* File upload component */}
        {/* <input type="file" onChange={handleFileChange} /> */}
        {/* <button onClick={handleFileUpload}>Upload</button> */}
        <FileUploadComponent />
      </div>
      
      {/* Right Column */}
      <div className="rightColumn">
        <div className="container">
          <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            Look at this scan I made!
          </div>
          <div style={{ fontSize: "2rem" }}>$15.99</div>
          <div style={{ fontSize: "1rem" }}>Hand crafted with love.</div>
        </div>
      </div>
    </div>
  );
}



export default App;
