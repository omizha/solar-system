import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GroupProps } from "@react-three/fiber";

export const Moon = React.memo((props?: GroupProps) => {
    const moonRef = useRef<THREE.Group>();

    const diffuse = useTexture("/model/moon/diffuse.png");

    useEffect(() => {
        const func = async () => {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath("/draco/");
            dracoLoader.preload();
            const geometry = await dracoLoader.loadAsync(
                "/model/moon/geometry.drc"
            );
            const material = new THREE.MeshStandardMaterial();
            material.map = diffuse;
            material.side = THREE.DoubleSide;

            const mesh = new THREE.Mesh(geometry, material);
            moonRef.current.add(mesh);

            console.log(moonRef.current);
        };
        func();
    }, []);

    return (
        <>
            <group ref={moonRef} name="moon" {...props}></group>
        </>
    );
});
