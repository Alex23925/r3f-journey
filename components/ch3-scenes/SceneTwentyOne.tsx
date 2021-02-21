import React, { useRef, useState, useEffect } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import type { Mesh } from 'three'
import CameraControls from '../CameraControls'

interface SceneProps {
    elevation: number,
    color: string,
    hoverColor:string,
    wireframe: boolean
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
            position={[0, elevation ,0]}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial wireframe={props.wireframe} color={hovered ? hoverColor : color} />
        </mesh>
    )
}

const Floor = () => {
    return (
        <mesh rotation-x={-Math.PI * 0.5} receiveShadow={true}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial
                color={'#444444'}
                metalness={0}
                roughness={0.5}
            />
        </mesh>
    )
}

const Lights = () => {
    return (
        <group>
            <ambientLight args={[0xffffff, 0.8]} />
            <directionalLight
                castShadow={true}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={15}
                shadow-camera-left={-7}
                shadow-camera-top={7}
                shadow-camera-bottom={-7}
                position={[5, 5, 5]}
                args={[0xffffff, 0.6]}
            />
        </group>
    )
}

export default function SceneTwentyOne(props: SceneProps) {
    return (
        <>
            <Box 
                elevation={props.elevation} 
                color={props.color} 
                hoverColor={props.hoverColor} 
                wireframe={props.wireframe}  
            />
            <Floor />
            <Lights />
            <CameraControls />
        </>
    )
}