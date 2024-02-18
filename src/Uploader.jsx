import React, { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';


const FileUploadComponent = () => {
    const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const imageRef = useRef(null);
    const messageRef = useRef(null);

    // var in_name = "upload.mp4";
    // var out_name = "thumbnails/thumbnails%d.png";

    /* FFMPEG WASM */

    const uploadImages = async (images) => {
        try {
            const formData = new FormData();
            formData.append('images', images); // Assuming you have only one image for now
    
            const response = await fetch('http://localhost:3000/process-images', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                console.log('Images uploaded successfully');
                // You can perform further actions here upon successful upload
            } else {
                console.error('Failed to upload images');
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

const loadVideo = async () => {
        // await ffmpeg.load();

        const ffmpeg = ffmpegRef.current;
        //First create a thumbnails directory in the file system
        console.log("Loading Video");
        await ffmpeg.createDir("videoFrames");
        // ffmpeg.FS('writeFile', "upload.mov", await fetchFile("../video-to-model-src/temp_videodata/IMG_0269.MOV"));
        await ffmpeg.writeFile("upload.mov", await fetchFile("../video-to-model-src/temp_videodata/IMG_0269.MOV"));

        // let data = await ffmpeg.readFile('upload.mov');
        // console.log("Reading Uploaded Video:");
        // console.log(data);
        
        await ffmpeg.exec(['-i', "upload.mov", '-r', "1", 'videoFrames/output_frame_%04d.png']);
    
        //Read the contents of the specified folder in a loop 
        console.log("Created outputs!");
        console.log(await ffmpeg.listDir('.'));
        console.log(await ffmpeg.listDir('videoFrames'));
        let fileData = await ffmpeg.readFile('videoFrames/output_frame_0001.png');
        console.log("Reading Frame 1:");
        console.log(fileData);
        
        // // const data = new Uint8Array(fileData as ArrayBuffer);
        // var blob = new Blob([fileData], {'type': 'image/png'});
        // imageRef.current.src = URL.createObjectURL(blob); 
        
        // if (imageRef.current) {
        //     imageRef.current.src = URL.createObjectURL(
        // new Blob([data.buffer], { type: 'image/png' })
        // )

        // For each image, upload it to the server
        for (let i = 0; i < 10; i++) {
            let image;
            if (i < 10) {
                image = await ffmpeg.readFile('videoFrames/output_frame_000' + str(i) + '.png');
            }
            else {
                image = await ffmpeg.readFile('videoFrames/output_frame_00' + str(i) + '.png');
            }

            await uploadImages(image);
        }

        const response = await fetch('http://localhost:3000/process-images', {
            method: 'POST',
            body: formData
        });
        
        //view first image
        // var new_file = ffmpeg.FS('readFile', 'videoFrames/output_frame_0001.png');
        // console.log(new Blob([new_file.buffer], { type: 'image/png' }));
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
        <image ref={imageRef}></image>
        <button onClick={loadVideo}> Now, upload Video </button>
        </>
    ) : (
        <button onClick={load}>Load ffmpeg-core (~31 MB)</button> // prev load
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
