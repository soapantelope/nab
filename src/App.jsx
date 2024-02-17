import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Following https://aps.autodesk.com/en/docs/reality-capture/v1/tutorials/create-3d-mesh-from-photos/
function App() {
  const isMounted = useRef(false);

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
              scope:
                "bucket:create bucket:read data:create data:write data:read",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create access key");
        }

        const jsonData = await response.json();
        console.log(Date.now());

        return jsonData.access_token;
      } catch (error) {
        console.error("Error creating access key:", error);
      }
    };

    const createPhotoscene = async (token) => {
      try {
        console.log("Bearer " + token);
        const tokenData = JSON.parse(atob(token.split(".")[1])); // Decode token payload
        const tokenExpiration = tokenData.exp * 1000; // Convert expiration time to milliseconds

        console.log(
          tokenExpiration.toString() + ", " + (Date.now() >= tokenExpiration)
        ); // Check if current time is greater than or equal to expiration time???

        const response = await fetch(
          "https://developer.api.autodesk.com/photo-to-3d/v1/photoscene",
          {
            method: "POST",
            headers: {
              // THIS IS NOT WORKING FOR SOME REASON...
              // ERROR 401 (INVALID AUTH TOKEN)
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
          throw new Error("Failed to create photoscene" + response.statusText);
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

  return (
    <>
      <div style={{ fontSize: "5rem" }}>Nab!!</div>
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
          </div>
          <div>2</div>
        </div>
      </main>
    </>
  );
}

export default App;
