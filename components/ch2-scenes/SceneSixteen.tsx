import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import type { Mesh } from 'three'
import CameraControls from '../CameraControls'
import * as THREE from 'three'

interface SceneProps {
    elevation: number,
    color: string,
    hoverColor: string,
    wireframe: boolean,
    ambientLightIntensity: number,
    moonLightIntensity: number,
    xPosition: number,
    yPosition: number,
    zPosition: number,
}

interface BoxProps {
    elevation: number,
    color: string,
    hoverColor: string,
    wireframe: boolean
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
            onPointerOut={(event) => setHover(false)}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial wireframe={props.wireframe} color={hovered ? hoverColor : color} />
        </mesh>
    )
}

export default function SceneSixteen(props: SceneProps) {

    // Textures
    const loadingManager = useMemo(() => new THREE.LoadingManager(), [])
    const textureLoader = useMemo(() => new THREE.TextureLoader(loadingManager), [])


    //* House *\\

    // Temporary Sphere
    const sphere =
        <mesh
            position={[0, 2, 0]}
        >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial roughness={.7} />
        </mesh>

    // Floor
    const floor =
        <mesh
            rotation-x={-Math.PI * .5}
            position={[0, 1, 0]}
        >
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color={'#a9c388'} />
        </mesh>

    //* Lights *\\

    // Ambient Light
    const ambientLight = <ambientLight color={'#ffffff'} intensity={props.ambientLightIntensity} />

    // Directional Light 
    const moonLight = <directionalLight color={'#ffffff'} />

    return (
        <>
            {sphere}
            {floor}
            {ambientLight}
            {moonLight}
            <CameraControls />
        </>
    )
}