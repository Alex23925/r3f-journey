import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import type { PlaneBufferGeometry, PlaneGeometry, ShaderMaterial } from "three";
import CameraControls from "../CameraControls";
import vertex from "../../shaders/scene26/vertex.glsl";
import fragment from "../../shaders/scene26/fragment.glsl";
import * as THREE from "three";

interface SceneProps {
    elevation: number;
    color: string;
    depthColor: string;
    uColorOffset: number;
    uColorMultiplier: number;
    wireframe: boolean;
    uFrequencyX: number;
    uBigWavesElevation: number;
    uBigWavesSpeed: number;
    uFrequencyY: number;
}

export default function SceneTwentySix(props: SceneProps) {
    // Refs
    const shaderMaterialRef = useRef<ShaderMaterial>();

    const uniforms = useMemo(() => {
        return {
            uTime: { value: 0 },
            uFrequency: {
                value: new THREE.Vector2(props.uFrequencyX, props.uFrequencyY),
            },
            uBigWavesElevation: { value: props.uBigWavesElevation },
            uBigWavesSpeed: { value: props.uBigWavesSpeed },
            uColor: { value: new THREE.Color(props.color) },
            uDepthColor: { value: new THREE.Color(props.depthColor) },
            uColorOffset: { value: props.uColorOffset },
            uColorMultiplier: { value: props.uColorMultiplier },
        };
    }, []);

    useFrame((_) => {
        let time = _.clock.getElapsedTime();
        uniforms.uTime.value = time;
    });

    // Change uniform with GUI
    if (shaderMaterialRef.current) {
        shaderMaterialRef.current.uniforms.uFrequency.value = new THREE.Vector2(
            props.uFrequencyX,
            props.uFrequencyY
        );

        shaderMaterialRef.current.uniforms.uBigWavesElevation.value =
            props.uBigWavesElevation;
        shaderMaterialRef.current.uniforms.uBigWavesSpeed.value =
            props.uBigWavesSpeed;

        shaderMaterialRef.current.uniforms.uColor.value = new THREE.Color(
            props.color
        );
        shaderMaterialRef.current.uniforms.uDepthColor.value = new THREE.Color(
            props.depthColor
        );

        shaderMaterialRef.current.uniforms.uColorOffset.value =
            props.uColorOffset;
        shaderMaterialRef.current.uniforms.uColorMultiplier.value =
            props.uColorMultiplier;
    }

    return (
        <>
            <ambientLight />
            <pointLight position={[5, 5, 5]} />
            <mesh rotation-x={-Math.PI * 0.5}>
                <planeBufferGeometry args={[2, 2, 512, 512]} />
                <shaderMaterial
                    ref={shaderMaterialRef}
                    uniforms={uniforms}
                    vertexShader={vertex}
                    fragmentShader={fragment}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <CameraControls />
        </>
    );
}
