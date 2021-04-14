import React, { useRef, useState, useMemo, Suspense } from "react";
import { useThree, useFrame } from "react-three-fiber";
import type { Group, Mesh } from "three";
import CameraControls from "../CameraControls";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js";
import HelmetUrl from "../../static/models/FlightHelmet/glb/DamagedHelmet.glb";

import px from "../../static/textures/environmentMaps/0/px.jpg";
import nx from "../../static/textures/environmentMaps/0/nx.jpg";
import py from "../../static/textures/environmentMaps/0/py.jpg";
import ny from "../../static/textures/environmentMaps/0/ny.jpg";
import pz from "../../static/textures/environmentMaps/0/pz.jpg";
import nz from "../../static/textures/environmentMaps/0/nz.jpg";

interface SceneProps {
    elevation: number;
    color: string;
    hoverColor: string;
    wireframe: boolean;
}

interface BoxProps {
    elevation: number;
    color: string;
    hoverColor: string;
    wireframe: boolean;
}

interface EnvironmentProps {
    envMap: THREE.CubeTexture;
}

const Helmet = () => {
    const headRef = useRef<Group>();
    const { scene } = useGLTF(HelmetUrl);

    // UNIFORMS
    const customUniforms = useMemo(() => {
        return {
            uTime: { value: 0 },
        };
    }, []);

    // Animations
    useFrame((_) => {
        let time = _.clock.getElapsedTime();
        customUniforms.uTime.value = time;
    });

    scene.traverse((child : any) => {
        if (
            child instanceof THREE.Mesh &&
            child.material instanceof THREE.MeshStandardMaterial
        ) {
            child.material.envMapIntensity = 5;
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    return (
        <group rotation-y={Math.PI * 0.5} receiveShadow={true} ref={headRef}>
            <primitive object={scene} />
        </group>
    );
};

const Environment = (props: EnvironmentProps) => {
    const { gl, scene, camera, size } = useThree();

    scene.background = props.envMap;
    scene.environment = props.envMap;
    return null;
};

export default function SceneTwentyNine(props: SceneProps) {
    const loadingManager = useMemo(() => new THREE.LoadingManager(), []);
    const cubeTextureLoader = useMemo(
        () => new THREE.CubeTextureLoader(loadingManager),
        [px, nx, py, ny, pz, nz]
    );
    const environmentMapTexture = cubeTextureLoader.load([
        px,
        nx,
        py,
        ny,
        pz,
        nz,
    ]);

    environmentMapTexture.encoding = THREE.sRGBEncoding;
    
    return (
        <>
            {/* <ambientLight />
            <pointLight position={[10, 10, 10]} /> */}
            <directionalLight
                castShadow={true}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={15}
                intensity={3}
                color={"#ffffff"}
                shadow-normalBias={0.05}
                position={[0.25, 2, -2.25]}
            />
            <Suspense fallback={null}>
                <Helmet />
                <Environment envMap={environmentMapTexture} />
            </Suspense>
            <CameraControls />
        </>
    );
}
