import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Earth } from "./model/Earth";
import { Sun } from "./model/Sun";

export const Main = () => {
    const scene = useThree((state) => state.scene);

    useEffect(() => {
        scene.background = new THREE.Color("#000");
    }, []);

    return (
        <>
            <PerspectiveCamera
                makeDefault
                position={[0, 0, -3000]}
                far={10000}
            />
            <group>
                <Sun />
                <group>
                    <Earth position={[-2000, 0, 0]} scale={0.25} />
                </group>
            </group>
            <OrbitControls />
            <ambientLight />
        </>
    );
};
