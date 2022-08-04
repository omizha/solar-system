import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GroupProps } from "@react-three/fiber";

export const Earth = React.memo((props?: GroupProps) => {
    const earthRef = useRef<THREE.Group>();

    const diffuse = useTexture("/model/earth/diffuse.png");

    useEffect(() => {
        const func = async () => {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath("/draco/");
            dracoLoader.preload();
            const geometry = await dracoLoader.loadAsync(
                "/model/earth/geometry.drc"
            );
            const material = new THREE.MeshStandardMaterial();
            material.map = diffuse;
            material.side = THREE.DoubleSide;

            const mesh = new THREE.Mesh(geometry, material);
            earthRef.current.add(mesh);

            console.log(earthRef.current);
        };
        func();
    }, []);

    return (
        <>
            <group ref={earthRef} name="earth" {...props}></group>
        </>
    );
});
