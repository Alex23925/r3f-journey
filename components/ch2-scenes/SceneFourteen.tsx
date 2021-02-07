import React, { useRef, useState, useEffect } from 'react'
import { MeshProps, useFrame, useResource } from 'react-three-fiber'
import { Mesh, PointLight, PointLightHelper } from 'three'
import CameraControls from '../CameraControls'
import { useHelper } from "@react-three/drei"

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
            onPointerOut={(event) => setHover(false)}>
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

export default function SceneFourteen(props: SceneProps) {
    // Refs
    const lightRef = useRef()

    //Helper
    useHelper(lightRef, PointLightHelper, 0.5, props.color)

    return (
        <>
            <ambientLight intensity={.5} />
            <pointLight ref={lightRef} position={[10, 10, 10]} />
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
            <mesh rotation-x={-Math.PI * .5}>
                <planeBufferGeometry args={[10, 10 ,2]} />
                <meshStandardMaterial />
            </mesh>
            <CameraControls />
        </>
    )
}