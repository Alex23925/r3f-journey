import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import type { Mesh } from 'three'
import CameraControls from '../CameraControls'
import * as THREE from 'three'

interface SceneProps {
    elevation: number,
    color: string,
    hoverColor: string,
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

export default function SceneThirteen(props: SceneProps) {
    // Refs
    const textRef= useRef<Mesh>()

    // Fonts
    const fontLoader = useMemo(() => new THREE.FontLoader, [])

    const font1 = '../../static/fonts/helvetiker_regular.typeface.json'

    
    const textMaterial = <meshBasicMaterial wireframe={props.wireframe} />
    const text =
        <mesh position={[-1,0,0]} ref={textRef}>
            {textMaterial}
        </mesh>

    fontLoader.load(
        font1,
        (font) => {
            console.log('font loaded')
            const textGeometry = new THREE.TextBufferGeometry(
            'Hello World', 
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
            )
            if(textRef.current) {
                textRef.current.geometry = textGeometry
            }
        }
    )

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
            {text}
            <CameraControls />
        </>
    )
}