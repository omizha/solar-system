import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GroupProps } from "@react-three/fiber";

export const Earth = React.memo((props?: GroupProps) => {
    const earthRef = useRef<THREE.Group>();

    const [diffuse, normal] = useTexture([
        "/model/earth/diffuse.png",
        "/model/earth/normal.png",
    ]);

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
            // 노말맵이 적용된 것인가? (육안으로는 확인이 어렵지만, console.log에는 텍스처가 적용돼있다는 것을 알 수 있다.)
            material.normalMap = normal;
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
