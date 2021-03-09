import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import type { PlaneBufferGeometry, PlaneGeometry, ShaderMaterial } from "three";
import CameraControls from "../CameraControls";
import vertex from "../../shaders/scene25/vertex.glsl";
import fragment from "../../shaders/scene25/fragment.glsl";
import * as THREE from "three";
import texture from "../../static/textures/flag-french.jpg";

interface SceneProps {
    elevation: number;
    color: string;
    hoverColor: string;
    wireframe: boolean;
    uFrequencyX: number;
    uFrequencyY: number;
}

interface BoxProps {
    elevation: number;
    color: string;
    hoverColor: string;
    wireframe: boolean;
}

export default function SceneTwentyFive(props: SceneProps) {
    // Texture Loader
    const textureLoader = useMemo(() => new THREE.TextureLoader(), [texture]);

    const flagTexture = textureLoader.load(texture);

    // Refs
    const geometryRef = useRef<PlaneBufferGeometry>();
    const shaderMaterialRef = useRef<ShaderMaterial>();

    let count = 0;
    if (geometryRef.current) {
        count = geometryRef.current.attributes.position.count;
    }
    const randoms = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        randoms[i] = Math.random();
    }

    geometryRef.current?.setAttribute(
        "aRandom",
        new THREE.BufferAttribute(randoms, 1)
    );

    const uniforms = useMemo(() => {
        return {
            uFrequency: {
                value: new THREE.Vector2(10, 10),
            },
            uTime: { value: 0 },
            uColor: { value: new THREE.Color("orange") },
            uTexture: { value: flagTexture },
        }
    }, [])

    // useFrame((_) => {
    //     let time = _.clock.getElapsedTime();
    //     uniforms.uTime.value = time * 2.0;
    // });

    if (shaderMaterialRef.current) {
        shaderMaterialRef.current.uniforms.uFrequency.value = new THREE.Vector2(
            props.uFrequencyX,
            props.uFrequencyY
        );
    }

    return (
        <>
            <ambientLight />
            <pointLight position={[5, 5, 5]} />
            <mesh>
                <planeBufferGeometry args={[1, 1, 32, 32]} />
                <shaderMaterial
                    ref={shaderMaterialRef}
                    vertexShader={vertex}
                    fragmentShader={fragment}
                    side={THREE.DoubleSide}
                    uniforms={uniforms}
                />
            </mesh>
            <CameraControls />
        </>
    );
}
