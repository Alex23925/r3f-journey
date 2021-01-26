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
    wireframe: boolean,
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


export default function SceneTwelve(props: SceneProps) {
    
    // Refs
    const sphereRef = useRef<Mesh>()
    const planeRef = useRef<Mesh>()
    const torusRef = useRef<Mesh>()
    // Material
    const material = <meshBasicMaterial color={props.color} />
    
    // Meshes
    const sphere = 
        <mesh ref={sphereRef} position={[-1.5,0,0]} >
            <sphereBufferGeometry args={[.5, 16, 16]} />
            {material}
        </mesh>

    const plane = 
        <mesh ref={planeRef} >
            <planeBufferGeometry args={[1,1]} />
            {material}
        </mesh>

    const torus = 
        <mesh ref={torusRef} position={[1.5, 0, 0]} >
            <torusBufferGeometry args={[.3, .2, 16, 32]} />
            {material}
        </mesh>

    // Animation
    useFrame((state) => {
        let time = state.clock.getElapsedTime()

        if(sphereRef?.current) {
            sphereRef.current.rotation.y = .15 * time
        }
        if(planeRef?.current) {
            planeRef.current.rotation.y = .15 * time
        }
        if(torusRef?.current) {
            torusRef.current.rotation.y = .15 * time
        }

        if (sphereRef?.current) {
            sphereRef.current.rotation.x = .15 * time
        }
        if (planeRef?.current) {
            planeRef.current.rotation.x = .15 * time
        }
        if (torusRef?.current) {
            torusRef.current.rotation.x = .15 * time
        }

    })
    
    return (
        <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* <Box 
                elevation={props.elevation} 
                color={props.color} 
                hoverColor={props.hoverColor} 
                wireframe={props.wireframe}  
            /> */}
            {sphere}
            {plane}
            {torus}
            <CameraControls />
        </>
    )
}