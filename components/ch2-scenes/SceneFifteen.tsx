import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MeshProps, useFrame, useThree, useResource } from 'react-three-fiber'
import { Mesh, PointLight, PointLightHelper, DirectionalLightHelper } from 'three'
import * as THREE from 'three'
import CameraControls from '../CameraControls'
import { useHelper } from '@react-three/drei'
import shadow from '../../static/textures/bakedShadow.jpg'


interface SceneProps {
    elevation: number,
    color: string,
    hoverColor: string,
    wireframe: boolean,
    metalness: number,
    roughness: number,
    aoIntensity: number,
    displacementScale: number,
}

interface BoxProps {
    elevation: number,
    color: string,
    hoverColor: string,
    wireframe: boolean,
    metalness: number,
    roughness: number,
    aoIntensity: number,
    displacementScale: number,
}

const Box = (props: BoxProps) => {
    let elevation = props.elevation
    let color = props.color
    let hoverColor = props.hoverColor
    // This reference will give us direct access to the mesh
    const mesh = useRef<Mesh>()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.001
    })

    return (
        <mesh
            ref={mesh}
            position={[0, elevation, 0]}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
            castShadow={true}
        >
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                wireframe={props.wireframe}
                color={hovered ? hoverColor : color}
                metalness={props.metalness}
                roughness={props.roughness}
                aoMapIntensity={props.aoIntensity}
                displacementScale={props.displacementScale}
            />
        </mesh>
    )
}

export default function SceneFifteen(props: SceneProps) {

    // Textures
    const loadingManager = useMemo(() => new THREE.LoadingManager(), [])
    loadingManager.onStart = () => {
        console.log('onStart')
    }

    loadingManager.onLoad = () => {
        console.log('onLoaded')
    }

    loadingManager.onProgress = () => {
        console.log('onProgress')
    }

    loadingManager.onError = () => {
        console.log('onError')
    }

    const bakeShadow = useMemo(() => new THREE.TextureLoader(loadingManager).load(shadow), [shadow])


    //Hooks
    const {scene} = useThree()

    // Refs
    const lightRef = useRef()
    const directionalLightRef = useRef()


    //Helpers
    useHelper(directionalLightRef, DirectionalLightHelper, 0.5, props.color)
    
    let cameraHelper
    useEffect(() => {
        cameraHelper = new THREE.CameraHelper(directionalLightRef.current?.shadow.camera)
        cameraHelper.visible = false
        scene.add(cameraHelper)
    }, [])




    return (
        <>
            <ambientLight intensity={.5} />
            <directionalLight
                castShadow={true}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={6}
                shadow-camera-near={1}
                shadow-camera-top = {2}
                shadow-camera-right = {2}
                shadow-camera-left = {-2}
                shadow-camera-bottom = {-2}
                ref={directionalLightRef}
                position={[2, 2, -1]}
            />
            <Box
                elevation={props.elevation}
                color={props.color}
                hoverColor={props.hoverColor}
                wireframe={props.wireframe}
                metalness={props.metalness}
                roughness={props.roughness}
                aoIntensity={props.aoIntensity}
                displacementScale={props.displacementScale}
            />
            <mesh position={[-1, -1, 0]} receiveShadow={true} rotation-x={-Math.PI * .5}>
                <planeBufferGeometry args={[7, 8, 1]} />
                <meshBasicMaterial map={bakeShadow} />
            </mesh>
            <CameraControls />
        </>
    )
}