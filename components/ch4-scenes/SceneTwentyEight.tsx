import React, { useRef, useState, useMemo, Suspense } from "react";
import { useThree, useFrame } from "react-three-fiber";
import type { Group, Mesh } from "three";
import CameraControls from "../CameraControls";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import HeadUrl from "../../static/models/LeePerrySmith/LeePerrySmith.glb";
import headImg from "../../static/models/LeePerrySmith/color.jpg";
import normalImg from "../../static/models/LeePerrySmith/normal.jpg";

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

const LeePerry = () => {
    // Textures
    const loadingManager = useMemo(() => new THREE.LoadingManager(), []);
    const mapTexture = useMemo(
        () => new THREE.TextureLoader(loadingManager).load(headImg),
        [headImg]
    );
    mapTexture.encoding = THREE.sRGBEncoding;

    const normalTexture = useMemo(
        () => new THREE.TextureLoader(loadingManager).load(normalImg),
        [normalImg]
    );

    const headRef = useRef<Group>();
    const { scene } = useGLTF(HeadUrl);

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

    const material = useMemo(() => new THREE.MeshStandardMaterial(), []);
    material.map = mapTexture;
    material.normalMap = normalTexture;
    material.needsUpdate = true;
    material.envMapIntensity = 5;

    const depthMaterial = useMemo(
        () =>
            new THREE.MeshDepthMaterial({
                depthPacking: THREE.RGBADepthPacking,
            }),
        []
    );

    material.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = customUniforms.uTime;

        shader.vertexShader = shader.vertexShader.replace(
            "#include <common>",
            `
                #include <common>

                uniform float uTime;

                mat2 rotate2d(float _angle){
                    return mat2(cos(_angle),-sin(_angle),
                    sin(_angle),cos(_angle));
                }


            `
        );

        shader.vertexShader = shader.vertexShader.replace(
            "#include <beginnormal_vertex>",
            `
                #include <beginnormal_vertex>
                 
                float angle = (position.y + uTime) * 0.2;
                mat2 rotateMatrix = rotate2d(angle);

                objectNormal.xz = rotateMatrix * objectNormal.xz;

            `
        );

        shader.vertexShader = shader.vertexShader.replace(
            "#include <begin_vertex>",
            `
                #include <begin_vertex>

                transformed.xz = rotateMatrix * transformed.xz;

            `
        );
    };

    depthMaterial.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = customUniforms.uTime;

        shader.vertexShader = shader.vertexShader.replace(
            "#include <common>",
            `
                #include <common>

                uniform float uTime;

                mat2 rotate2d(float _angle){
                    return mat2(cos(_angle),-sin(_angle),
                    sin(_angle),cos(_angle));
                }


            `
        );

        shader.vertexShader = shader.vertexShader.replace(
            "#include <begin_vertex>",
            `
                #include <begin_vertex>

                
                float angle = (position.y + uTime) * 0.2;
                mat2 rotateMatrix = rotate2d(angle);

                transformed.xz = rotateMatrix * transformed.xz;

            `
        );
    };

    scene.traverse((child) => {
        child.customDepthMaterial = depthMaterial;
        if (
            child instanceof THREE.Mesh &&
            child.material instanceof THREE.MeshStandardMaterial
        ) {
            child.material = material;
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
    const { gl, scene } = useThree();
    scene.background = props.envMap;
    return null;
};

export default function SceneTwentyEight(props: SceneProps) {
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
                <mesh
                    receiveShadow={true}
                    rotation-y={Math.PI}
                    position={[0, -5, 5]}
                >
                    <planeBufferGeometry args={[15, 15, 15]} />
                    <meshStandardMaterial />
                </mesh>
                <LeePerry />
                <Environment envMap={environmentMapTexture} />
            </Suspense>
            <CameraControls />
        </>
    );
}
