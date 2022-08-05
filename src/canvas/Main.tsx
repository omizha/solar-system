import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Earth } from "./model/Earth";
import { Sun } from "./model/Sun";
import { Moon } from "./model/Moon";

export const Main = () => {
    const sunOrbitRef = useRef<THREE.Group>();
    const earthOrbitRef = useRef<THREE.Group>();

    const scene = useThree((state) => state.scene);

    useEffect(() => {
        scene.background = new THREE.Color("#000");
    }, []);

    useFrame((_, delta) => {
        sunOrbitRef.current.rotation.y += (delta * Math.PI * 2) / 365;
        earthOrbitRef.current.rotation.y += (delta * Math.PI * 2) / 27;
    });

    return (
        <>
            <PerspectiveCamera
                makeDefault
                position={[0, 4000, -1000]}
                far={10000}
            />
            <group ref={sunOrbitRef}>
                <Sun />
                <group ref={earthOrbitRef} position={[-1000, 0, 0]}>
                    <Earth scale={0.25} />
                    <group position={[250, 0, 0]}>
                        <Moon scale={0.1} />
                    </group>
                </group>
            </group>
            <OrbitControls />
            <ambientLight />
        </>
    );
};
