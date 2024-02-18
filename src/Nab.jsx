import { useState, useEffect, useRef } from "react";
import "./App.css";
import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";

import { useGLTF } from "@react-three/drei";
import Glb from "./poly.glb";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Model(url) {
  const { nodes, materials } = useGLTF(url);
  //   const gltf = useLoader(GLTFLoader, workingURL);

  return (
    // <primitive object={gltf.scene} />
    <group dispose={null}>
      <mesh
        scale={50}
        position={[0, -1, 0]}
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
      />
    </group>
  );
}

// useGLTF.preload(url);

function Nab(video) {
  const [url, setURL] = useState("");
  // Send a request to the server to get the url of the 3D model based on the video prop
  // The url will be stored in the url variable

  return (
    <div className="nab">
      <Canvas>
        <OrbitControls />
        <Suspense fallback={null}>
          {/* Replace with given URL */}
          <Model url="https://pub-8fdcfc93cb6149e48647d45b07b5e003.r2.dev/src/testdata/poly.glb" />
          <ambientLight intensity={3} />
          <pointLight position={[10, 10, 10]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Nab;
