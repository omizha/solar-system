import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Earth } from "./model/Earth";
import { Sun } from "./model/Sun";
import { Moon } from "./model/Moon";

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
                <group position={[-2000, 0, 0]}>
                    <Earth scale={0.25} />
                    <group position={[500, 0, 0]}>
                        <Moon scale={0.1} />
                    </group>
                </group>
            </group>
            <OrbitControls />
            <ambientLight />
        </>
    );
};
