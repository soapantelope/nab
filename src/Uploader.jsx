import React, { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const FileUploadComponent = () => {
    const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    // const videoRef = useRef(null);
    const messageRef = useRef(null);

    // var in_name = "upload.mp4";
    // var out_name = "thumbnails/thumbnails%d.png";

const loadVideo = async () => {
        // await ffmpeg.load();

        const ffmpeg = ffmpegRef.current;
        //First create a thumbnails directory in the file system
       
        ffmpeg.FS('mkdir','/videoFrames');
        // ffmpeg.FS('writeFile', "upload.mov", await fetchFile("../video-to-model-src/temp_videodata/IMG_0269.MOV"));
        ffmpeg.FS('writeFile', "upload.mov", "../video-to-model-src/temp_videodata/IMG_0269.MOV");
        await ffmpeg.run('-i', "upload.mov", '-r', 1, 'output_frame_%04d.png');
    
        //Read the contents of the specified folder
        console.log(ffmpeg.FS('readdir', '/videoFrames'));
        //view first image
        var new_file = ffmpeg.FS('readFile', 'videoFrames/output_frame_0001.png');
        console.log(new Blob([new_file.buffer], { type: 'image/png' }));
}

   
  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript"
      ),
    });
    setLoaded(true);
  };


//     const transcode = async () => {
//       const ffmpeg = ffmpegRef.current;
//       await ffmpeg.writeFile('input.webm', await fetchFile('https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm'));
//       await ffmpeg.exec(['-i', 'input.webm', 'output.mp4']);
//       const data = await ffmpeg.readFile('output.mp4');
//       videoRef.current.src =
//           URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
//   }


//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//   };

//   const handleUpload = () => {
//     if (file) {
//       // Here you would send the file data to your server for processing
//       console.log('Uploading file:', file);
//     } else {
//       console.error('No file selected');
//     }
//   };


  return (loaded
    ? (
        // <>
        //     <video ref={videoRef} controls></video><br/>
        //     <button onClick={transcode}>Transcode webm to mp4</button>
        //     <p ref={messageRef}></p>
        //     <p>Open Developer Tools (Ctrl+Shift+I) to View Logs</p>
        // </> 
        <>
        <button onClick={loadVideo}> Now, upload Video </button>
        </>
    ) : (
        <button onClick={load}>Load ffmpeg-core (~31 MB)</button>
        //   <div>
    //   <input type="file" onChange={handleFileChange} />
    //   <button onClick={handleUpload}>Upload</button>
    // </div>
    )
);


};

export default FileUploadComponent;


// import React, { useState } from 'react';
// import Nab from "./Nab.jsx";

// const FileUploadComponent = ({ onFileUpload }) => {
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     onFileUpload(selectedFile);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//     </div>
//   );
// };

// export default FileUploadComponent;