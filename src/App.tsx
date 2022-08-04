import "./App.css";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { Main } from "./canvas/Main";

function App() {
    return (
        <div id="canvas-container">
            <Canvas>
                <Main />
            </Canvas>
        </div>
    );
}

export default App;
