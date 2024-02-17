import { useState, useEffect, useRef, Suspense } from "react";
import "./App.css";
import Nab from "./Nab.jsx";
//import Scene from "./components/render3d";

// Following https://aps.autodesk.com/en/docs/reality-capture/v1/tutorials/create-3d-mesh-from-photos/
function App() {
  return (
    <>
      <div style={{ fontSize: "5rem" }}>📸 Nab</div>
      <main className="container">
        <h1>Upload a video - get 3D model!</h1>
        <div className="grid">
          <div>
            <form>
              <label>
                <input type="file" />
              </label>
              <input type="submit" text="submit" />
            </form>
            <Nab video="temp"></Nab>
          </div>
          <div>
            {/* {" "}
            <Scene />{" "} */}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
