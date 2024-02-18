import { useState, useEffect, useRef, Suspense } from "react";
import "./App.css";
import Nab from "./Nab.jsx";
import Intro from "./intro.mp4";
// import FileUploadComponent from "./Uploader.jsx";

//
function App() {
  // THE FOLLOWING CODE IS COMMENTED OUT BECAUSE IT WAS OUR ORIGINAL ATTEMPT TO USE THE AUTODESK API.
  // IT WAS NOT IMPLEMENTED DUE TO AUTODESK NOT VERIFYING OUR ACCOUNT/A BUG ON THEIR END :(
  // https://aps.autodesk.com/en/docs/reality-capture/v1/tutorials/create-3d-mesh-from-photos/

  //   const isMounted = useRef(false);

  //   async function extractFramesFromVideo(videoUrl, fps = 2) {
  //     return new Promise(async (resolve) => {
  //       // fully download it first (no buffering):
  //       let videoBlob = await fetch(url).then((r) => r.blob());
  //       let videoObjectUrl = URL.createObjectURL(videoBlob);
  //       let video = document.createElement("video");

  //       let seekResolve;
  //       video.addEventListener("seeked", async function () {
  //         if (seekResolve) seekResolve();
  //       });

  //       video.src = videoObjectUrl;

  //       // workaround chromium metadata bug (https://stackoverflow.com/q/38062864/993683)
  //       while (
  //         (video.duration === Infinity || isNaN(video.duration)) &&
  //         video.readyState < 2
  //       ) {
  //         await new Promise((r) => setTimeout(r, 1000));
  //         video.currentTime = 10000000 * Math.random();
  //       }
  //       let duration = video.duration;

  //       let canvas = document.createElement("canvas");
  //       let context = canvas.getContext("2d");
  //       let [w, h] = [video.videoWidth, video.videoHeight];
  //       canvas.width = w;
  //       canvas.height = h;

  //       let frames = [];
  //       let interval = 1 / fps;
  //       let currentTime = 0;

  //       while (currentTime < duration) {
  //         video.currentTime = currentTime;
  //         await new Promise((r) => (seekResolve = r));

  //         context.drawImage(video, 0, 0, w, h);
  //         let base64ImageData = canvas.toDataURL();
  //         frames.push(base64ImageData);

  //         currentTime += interval;
  //       }
  //       resolve(frames);
  //     });
  //   }

  //   URL.revokeObjectURL(url); // revoke URL to prevent memory leak

  // AUTODESK API COULD NOT BE IMPLEMENTED DUE TO AUTHENTICATION ISSUES
  //   useEffect(() => {
  //     const createAccessToken = async () => {
  //       try {
  //         const response = await fetch(
  //           "https://developer.api.autodesk.com/authentication/v2/token",
  //           {
  //             method: "POST",
  //             headers: {
  //               Authorization:
  //                 "Basic " +
  //                 btoa("8ts8GR4FytJuRuc8VzpWU2e9xJvV6yWr:W0EEVIkul2JZlIyg"),
  //               "Content-Type": "application/x-www-form-urlencoded",
  //               Accept: "application/json",
  //             },
  //             body: new URLSearchParams({
  //               grant_type: "client_credentials",
  //               scope: "data:create data:read data:write",
  //             }),
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error("Failed to create access key");
  //         }

  //         const jsonData = await response.json();
  //         console.log(Date.now());

  //         return jsonData.access_token;
  //       } catch (error) {
  //         console.error("Error creating access key:", error);
  //       }
  //     };

  //     const createPhotoscene = async (token) => {
  //       try {
  //         console.log("Bearer " + token);
  //         const tokenData = JSON.parse(atob(token.split(".")[1])); // Decode token payload
  //         const tokenExpiration = tokenData.exp * 1000; // Convert expiration time to milliseconds

  //         console.log(
  //           tokenExpiration.toString() + ", " + (Date.now() >= tokenExpiration)
  //         ); // Check if current time is greater than or equal to expiration time???

  //         const response = await fetch(
  //           "https://developer.api.autodesk.com/photo-to-3d/v1/photoscene",
  //           {
  //             method: "POST",
  //             headers: {
  //               // THIS IS NOT WORKING FOR SOME REASON...
  //               // ERROR 401 (INVALID AUTH TOKEN)
  //               Authorization: "Bearer " + token,
  //               "Content-Type": "application/x-www-form-urlencoded",
  //             },
  //             body: new URLSearchParams({
  //               scenename: "testscene",
  //               format: "rcm,rcs,ortho",
  //               "metadata_name[0]": "targetcs",
  //               "metadata_value[0]": "UTM84-32N",
  //             }),
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error("Failed to create photoscene" + response.statusText);
  //         }

  //         const jsonData = await response.json();
  //         console.log("Photoscene created:", jsonData);
  //         return jsonData.photosceneid;
  //       } catch (error) {
  //         console.error("Error creating photoscene:", error);
  //       }
  //     };

  //     const addImages = async (token, photosceneid, photos) => {
  //       try {
  //         const response = await fetch(
  //           "https://developer.api.autodesk.com/photo-to-3d/v1/file",
  //           {
  //             method: "POST",
  //             headers: {
  //               Authorization: "Bearer " + token,
  //             },
  //             bodyL: new URLSearchParams({
  //               photosceneid: photosceneid,
  //               type: "image",
  //               // loop through photos

  //               file: "test.jpg",
  //             }),
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error("Failed to add images");
  //         }

  //         const jsonData = await response.json();
  //         console.log("Images data:", jsonData);
  //         return jsonData;
  //       } catch (error) {
  //         console.error("Error adding images:", error);
  //       }
  //     };

  //     const processPhotoscene = async (token, photosceneid) => {
  //       try {
  //         const response = await fetch(
  //           "https://developer.api.autodesk.com/photo-to-3d/v1/photoscene/" +
  //             photosceneid,
  //           {
  //             method: "POST",
  //             headers: {
  //               Authorization: "Bearer " + token,
  //             },
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error("Failed to process photoscene");
  //         }

  //         const jsonData = await response.json();
  //         console.log("Photoscene processed:", jsonData);
  //         return jsonData.photosceneid;
  //       } catch (error) {
  //         console.error("Error processing photoscene:", error);
  //       }
  //     };

  //     const trackPhotoscene = async (token, photosceneid) => {
  //       try {
  //         const response = await fetch(
  //           "https://developer.api.autodesk.com/photo-to-3d/v1/photoscene/" +
  //             photosceneid +
  //             "/progress",
  //           {
  //             method: "GET",
  //             headers: {
  //               Authorization: "Bearer " + token,
  //             },
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error("Failed to track photoscene");
  //         }

  //         const jsonData = await response.json();
  //         console.log("Photoscene tracked:", jsonData);
  //         return jsonData.progress;
  //       } catch (error) {
  //         console.error("Error tracking photoscene:", error);
  //       }
  //     };

  //     const fetchPhotoscene = async (token, photosceneid) => {
  //       try {
  //         const response = await fetch(
  //           "https://developer.api.autodesk.com/photo-to-3d/v1/photoscene/" +
  //             photosceneid,
  //           {
  //             method: "GET",
  //             headers: {
  //               Authorization: "Bearer " + token,
  //             },
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error("Failed to fetch photoscene");
  //         }

  //         const jsonData = await response.json();
  //         console.log("Photoscene data:", jsonData);
  //         return jsonData.scenelink;
  //       } catch (error) {
  //         console.error("Error fetching photoscene:", error);
  //       }
  //     };

  //     async function extractFrames(url) {
  //       return await extractFramesFromVideo(url, 2);
  //     }

  //     createAccessToken().then((token) => {
  //       createPhotoscene(token).then((photosceneid) => {
  //         // Parse video into photos
  //         //const photos = extractFrames(url);
  //         // console.log(photos);
  //         const photos = [];
  //         addImages(token, photosceneid, photos).then(() => {
  //           processPhotoscene(token, photosceneid).then(() => {
  //             trackPhotoscene(token, photosceneid).then(() => {
  //               fetchPhotoscene(token, photosceneid).then((scenelink) => {
  //                 console.log(scenelink);
  //               });
  //             });
  //           });
  //         });
  //       });
  //       isMounted.current = true;
  //     });
  //   }, [isMounted]);

  const dbURL =
    "https://pub-8fdcfc93cb6149e48647d45b07b5e003.r2.dev/src/testdata/";
  const [videoUrl, setVideoUrl] = useState(dbURL + "sparkling.glb");

  const handleFileUpload = (file) => {
    console.log("Updating File");
    // Here you would handle the file upload logic
    // For now, just update the video URL with a new URL
    setVideoUrl(dbURL + "poly.glb");
  };

  return (
    <div className="colContainer">
      {/* Left Column */}
      <div className="leftColumn">
        {/* Nab */}
        <Nab videoURL={videoUrl}></Nab>
        {/* File upload component */}
        {/* <input type="file" onChange={handleFileChange} /> */}
        <button onClick={handleFileUpload}>Upload</button>
        {/* <FileUploadComponent /> */}
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

// const { exec } = require('child_process');

// /* Uses FFmpeg & Swift */
// async function processVideo(inputFilePath, outputFilePath) {
//     // Execute FFmpeg command to extract frames from the video
//     const ffmpegCommand = `ffmpeg -i ${inputFilePath} -r 4 output_frame_%04d.png`;
//     await executeCommand(ffmpegCommand);

//     // Execute Swift binary to generate the USDZ file
//     const swiftCommand = `./HelloPhotogrammetry output_frame_directory ${outputFilePath} -d raw -o sequential -f normal`;
//     await executeCommand(swiftCommand);
// }

// function executeCommand(command) {
//     return new Promise((resolve, reject) => {
//         exec(command, (error, stdout, stderr) => {
//             if (error) {
//                 console.error(`Error executing command: ${error.message}`);
//                 reject(error);
//             } else {
//                 console.log(`Command output: ${stdout}`);
//                 resolve();
//             }
//         });
//     });
// }

export default App;
