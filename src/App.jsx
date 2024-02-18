import { useState, useEffect, useRef, Suspense } from "react";
import "./App.css";
import Cow from "./cow.png";
import Nab from "./Nab.jsx";
import Intro from "./intro.mp4";
//import Scene from "./components/render3d";

// Following https://aps.autodesk.com/en/docs/reality-capture/v1/tutorials/create-3d-mesh-from-photos/
function App() {
  return (
    <div className="colContainer">
      {/* IMAGES */}
      {/* <img className="img" src={Cow}></img> */}
      {/* NAB */}
      <Nab video="./intro.mp4"></Nab>
      <div className="container">
        <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
          Look at this cute cow I made!
        </div>
        <div style={{ fontSize: "2rem" }}>$15.99</div>
        <div style={{ fontSize: "1rem" }}>Hand crafted with love.</div>
      </div>
    </div>
  );
}

export default App;
