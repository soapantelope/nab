import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(btoa("8ts8GR4FytJuRuc8VzpWU2e9xJvV6yWr:UwgphvwzOm84Scq3"));
    const createAccessToken = async () => {
      try {
        const response = await fetch(
          "https://developer.api.autodesk.com/authentication/v2/token",
          {
            method: "POST",
            headers: {
              Authorization:
                "Basic " +
                btoa("8ts8GR4FytJuRuc8VzpWU2e9xJvV6yWr:UwgphvwzOm84Scq3"),
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
            body: new URLSearchParams({
              grant_type: "client_credentials",
              scope: "data:read",
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

    createAccessToken();
  }, []);

  return (
    <>
      <div style={{ fontSize: "5rem" }}>Nab!!</div>
    </>
  );
}

export default App;
