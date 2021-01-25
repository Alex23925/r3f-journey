import React, { useRef, useState, useMemo } from 'react'
import { MeshProps, useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import type { Mesh } from 'three'
import CameraControls from '../CameraControls'

import img from '../../static/color.jpg'

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
    // Textures
    const loadingManager = useMemo(() => new THREE.LoadingManager(), [img])
    const texture = useMemo(() => new THREE.TextureLoader(loadingManager).load(img), [img])


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
            <meshBasicMaterial attach="material" map={texture} />
        </mesh>
    )
}

export default function SceneTen(props: SceneProps) {
    return (
        <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box
                elevation={props.elevation}
                color={props.color}
                hoverColor={props.hoverColor}
                wireframe={props.wireframe}
            />
            <CameraControls />
        </>
    )
}