import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useControls } from "leva";

export const Sun = React.memo(() => {
    const sunRef = useRef<THREE.Group>();
    const sunlightRef = useRef<THREE.PointLight>();

    const diffuse = useTexture("/model/sun/diffuse.png");

    useControls("pointLight", {
        intensity: {
            value: 10,
            onChange: (value) => {
                sunlightRef.current.intensity = value;
            },
        },
    });

    useFrame((_, delta) => {
        sunRef.current.rotation.y += (delta * 2 * Math.PI) / 30;
    });

    useEffect(() => {
        const func = async () => {
            // 드라코를 불러오는 데에 어려움이 있었다.
            // 1. 드라코를 어떻게 불러와야 하는가?
            // => 드라코를 받고 디코더 path를 설정했어야 했다.
            // 2. DRACO를 어디서 다운받아야 했는가? (DRACO의 파일이 있는 구글 서버가 내려갔었다.)
            // => three.js 라이브러리에서 가져왔다.
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath("/draco/");
            dracoLoader.preload();
            const geometry = await dracoLoader.loadAsync(
                "/model/sun/geometry.drc"
            );
            const material = new THREE.MeshStandardMaterial();
            material.map = diffuse;
            material.side = THREE.DoubleSide;

            const mesh = new THREE.Mesh(geometry, material);
            sunRef.current.add(mesh);

            console.log(sunRef.current);
        };
        func();
    }, []);

    return (
        <>
            <group ref={sunRef} name="sun">
                <pointLight ref={sunlightRef} args={["orange", 10, 3000]} />
            </group>
        </>
    );
});
