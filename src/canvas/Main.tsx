import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
    OrbitControls,
    PerspectiveCamera,
    useTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Earth } from "./model/Earth";
import { Sun } from "./model/Sun";
import { Moon } from "./model/Moon";

export const Main = () => {
    const orbitControlRef = useRef<any>();
    const sunOrbitRef = useRef<THREE.Group>();
    const earthOrbitRef = useRef<THREE.Group>();

    const scene = useThree((state) => state.scene);

    const skyboxBg = useTexture("/texture/crab_nebula.png");

    useControls("camera", {
        autoRatate: {
            value: false,
            onChange: (value) => {
                orbitControlRef.current.autoRotate = value;
            },
        },
    });

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
                    <Moon position={[250, 0, 0]} scale={0.1} />
                </group>
            </group>
            <mesh>
                <sphereGeometry attach="geometry" args={[5000, 32, 32]} />
                <meshStandardMaterial
                    attach="material"
                    map={skyboxBg}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <OrbitControls ref={orbitControlRef} />
            <ambientLight />
        </>
    );
};
