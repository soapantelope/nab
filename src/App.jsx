import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const isMounted = useRef(false);
  if (!isMounted.current) {
    useEffect(() => {
      const createAccessToken = async () => {
        try {
          const response = await fetch(
            "https://developer.api.autodesk.com/authentication/v2/token",
            {
              method: "POST",
              headers: {
                Authorization:
                  "Basic " +
                  btoa("8ts8GR4FytJuRuc8VzpWU2e9xJvV6yWr:HEU2kdwTg2D8TxDd"),
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
              },
              body: new URLSearchParams({
                grant_type: "client_credentials",
                scope: "data:write data:read",
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to create access key");
          }

          const jsonData = await response.json();
          return jsonData.access_token;
        } catch (error) {
          console.error("Error creating access key:", error);
        }
      };

      const createPhotoscene = async (token) => {
        try {
          console.log("Bearer " + token);

          const response = await fetch(
            "https://developer.api.autodesk.com/photo-to-3d/v1/photoscene",
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                scenename: "testscene",
                format: "rcm,rcs,ortho",
                "metadata_name[0]": "targetcs",
                "metadata_value[0]": "UTM84-32N",
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to create photoscene");
          }

          const jsonData = await response.json();
          console.log("Photoscene created:", jsonData);
        } catch (error) {
          console.error("Error creating photoscene:", error);
        }
      };

      const fetchPhotoscene = async (token) => {
        try {
          const response = await fetch(
            "https://developer.api.autodesk.com/photo-to-3d/v1/photoscene/AtAuFsedTdqWdhF9VzHepp5oM9PITiuizI4xdMbz?format=rcm",
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch photoscene");
          }

          const jsonData = await response.json();
          console.log("Photoscene data:", jsonData);
        } catch (error) {
          console.error("Error fetching photoscene:", error);
        }
      };

      createAccessToken().then((token) => {
        createPhotoscene(token);
        isMounted.current = true;
      });
    }, [isMounted]);
  }

  return (
    <>
      <div style={{ fontSize: "5rem" }}>Nab!!</div>
    </>
  );
}

export default App;
