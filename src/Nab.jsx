// import { useState, useEffect, useRef } from "react";
// import "./App.css";
// import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
// import { Environment } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";

// import { useGLTF } from "@react-three/drei";
// import Glb from "./poly.glb";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// export function Model(url) {
  // const { nodes, materials } = useGLTF("/poly.glb");
    // const gltf = useLoader(GLTFLoader, workingURL);


//   return (
//     // <primitive object={gltf.scene} />
    // <group dispose={null}>
    //   <mesh
    //     scale={50}
    //     position={[0, -1, 0]}
    //     castShadow
    //     receiveShadow
    //     geometry={nodes.mesh_0.geometry}
    //     material={nodes.mesh_0.material}
    //   />
    // </group>
//   );
// }

// // useGLTF.preload(url);

// function Nab(video) {
//   const [url, setURL] = useState("");
//   // Send a request to the server to get the url of the 3D model based on the video prop
//   // The url will be stored in the url variable

//   return (
//     <div className="nab">
      // <Canvas>
      //   <OrbitControls />
      //   <Suspense fallback={null}>
      //     {/* Replace with given URL */}
      //     <Model url="" />
      //     <ambientLight intensity={3} />
      //     <pointLight position={[10, 10, 10]} />
      //   </Suspense>
      // </Canvas>
//     </div>
//   );
// }

// export default Nab;
import React, { useState, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

function Nab({ videoURL }) {
  const [url, setURL] = useState(videoURL);
  // const { scene } = useGLTF(url);
  const { nodes, materials } = useGLTF(url);

  useEffect(() => {
    // console.log(nodes)
    setURL(videoURL)
    // Load glTF resource asynchronously when URL changes
    async function loadGltf(url) {
      try {
        // const response = await fetch(url);
        // const blob = await response.blob();
        // const objectURL = URL.createObjectURL(blob);
        setURL(url);
      } catch (error) {
        console.error('Error loading glTF:', error);
      }
    }

    loadGltf(url);
  }, [url]);


function Model() {
  // console.log(nodes)
  return (
    // {/* <primitive object={scene} /> */}
    <group dispose={null}>
        <mesh
        scale={8}
        position={[0, -1, 0]}
        castShadow
        receiveShadow
        geometry={nodes.ObjectCapture.geometry}
        material={nodes.ObjectCapture.material}
      />
    </group>
  )
}
  
  return (
    <div className="nab">
      {/* Render the glTF scene */}
      <Canvas>
        <OrbitControls />
        <Suspense fallback={null}>
          {/* Replace with given URL */}
          <Model />
          <ambientLight intensity={3} />
          <pointLight position={[10, 10, 10]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Nab;
