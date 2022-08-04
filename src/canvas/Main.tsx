import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Sun } from "./model/Sun";

export const Main = () => {
    const scene = useThree((state) => state.scene);

    // useLoader(DRACOLoader, input);

    useEffect(() => {
        scene.background = new THREE.Color("#000");
    }, []);

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, -2000]} />
            <Sun />
            <OrbitControls />
            <ambientLight />
        </>
    );
};
