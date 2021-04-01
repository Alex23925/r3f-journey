import React, { useRef, useState, useMemo, useEffect } from "react";
import { MeshProps, useFrame, useThree } from "react-three-fiber";
import type { Mesh, Points, ShaderMaterial } from "three";
import CameraControls from "../CameraControls";
import * as THREE from "three";
import vertex from "../../shaders/scene27/vertex.glsl";
import fragment from "../../shaders/scene27/fragment.glsl";
import img1 from "../../static/textures/particles/8.png";

interface SceneProps {
    size: number;
    count: number;
    radius: number;
    branches: number;
    spin: number;
    randomness: number;
    randomnessPower: number;
    insideColor: string;
    outsideColor: string;
}

interface GalaxyProps extends SceneProps {}

export default function SceneTwentySeven(props: SceneProps) {
    return (
        <scene>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* <Particles size={.05} color={props.color} /> */}
            <Galaxy
                size={props.size}
                count={props.count}
                radius={props.radius}
                branches={props.branches}
                spin={props.spin}
                randomness={props.randomness}
                randomnessPower={props.randomnessPower}
                insideColor={props.insideColor}
                outsideColor={props.outsideColor}
            />
            {/* <axesHelper /> */}
            <CameraControls />
        </scene>
    );
}

const Galaxy = (props: GalaxyProps) => {
    const {gl} = useThree();

    //variables
    let angle = 0;

    // Refs
    const pointsRef = useRef<Points>();
    const shaderMaterialRef = useRef<ShaderMaterial>();

    // Uniforms
    const uniforms = useMemo(() => {
        return {
            uTime: { value: 0 },
            uSize: { value: props.size * gl.getPixelRatio() },
        };
    }, []);

    // Update Utime
    useFrame((_) => {
        let time = _.clock.getElapsedTime();
        uniforms.uTime.value = time;
    });


    // Change uniform with GUI
    if (shaderMaterialRef.current) {
        shaderMaterialRef.current.uniforms.uSize.value =
            props.size;
    }

    // Textures
    const loadingManager = useMemo(() => new THREE.LoadingManager(), []);
    const textureLoader = useMemo(
        () => new THREE.TextureLoader(loadingManager),
        [img1]
    );
    const particleTexture = textureLoader.load(img1);

    // Particles
    const positionArray = new Float32Array(props.count * 3);
    const colorArray = new Float32Array(props.count * 3);
    const scalesArray = new Float32Array(props.count * 1);

    const colorInside = useMemo(() => new THREE.Color(props.insideColor), []);
    const colorOutside = useMemo(() => new THREE.Color(props.outsideColor), []);

    for (let i = 0; i < props.count; i++) {
        const i3 = i * 3;

        // Position
        const radius = Math.random() * props.radius;
        const spinAngle = radius * props.spin;
        // use mod(%) so we only go from 0 to the number of branches (0-branches)
        const branchAngle =
            ((i % props.branches) / props.branches) * Math.PI * 2;

        // use randomness to get weird double galaxy effect
        const randomX =
            Math.pow(Math.random(), props.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1) *
            props.randomness *
            radius;
        const randomY =
            Math.pow(Math.random(), props.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1) *
            props.randomness *
            radius;
        const randomZ =
            Math.pow(Math.random(), props.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1) *
            props.randomness *
            radius;

        positionArray[i3 + 0] = Math.cos(branchAngle) * radius + randomX; // x
        positionArray[i3 + 1] = randomY; // y
        positionArray[i3 + 2] = Math.sin(branchAngle) * radius + randomZ; // z
        // positionArray[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius // x
        // positionArray[i3 + 1] = 0  // y
        // positionArray[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius // z

        // Color
        // colorArray[i] = Math.random()
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / props.radius);

        colorArray[i3 + 0] = mixedColor.r; // r
        colorArray[i3 + 1] = mixedColor.g; // g
        colorArray[i3 + 2] = mixedColor.b; // b

        // Scale
        scalesArray[i] = Math.random();
    }

    // Position Attribute
    const positionAttribute = useMemo(() => {
        const posAttribute = new THREE.BufferAttribute(positionArray, 3);
        return posAttribute;
    }, [positionArray]);

    // Color Attribute
    const colorAttribute = useMemo(() => {
        const colorAttribute = new THREE.BufferAttribute(colorArray, 3);
        return colorAttribute;
    }, [colorArray]);

    // Scale Attribute
    const scaleAttribute = useMemo(() => {
        const scaleAttribute = new THREE.BufferAttribute(scalesArray, 1);
        return scaleAttribute;
    }, [scalesArray]);

    // Buffer Geometry
    const particlesGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        return geometry;
    }, [positionAttribute]);

    particlesGeometry.setAttribute("position", positionAttribute);
    particlesGeometry.setAttribute("color", colorAttribute);
    particlesGeometry.setAttribute("aScale", scaleAttribute);

    const particleMaterial = (
        <shaderMaterial
            // depthTest={false}
            ref={shaderMaterialRef}
            blending={THREE.AdditiveBlending}
            uniforms={uniforms}
            depthWrite={false}
            vertexColors={true}
            vertexShader={vertex}
            fragmentShader={fragment}
        />
    );

    const particles = (
        <points
            ref={pointsRef}
            rotation-x={Math.PI / 12}
            geometry={particlesGeometry}
        >
            {particleMaterial}
        </points>
    );

    return <group>{particles}</group>;
};
