import React, { useRef, useState, useMemo } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import type { Mesh } from 'three'
import CameraControls from '../CameraControls'
import * as THREE from 'three'

import matcap from '../../static/textures/matcaps/7.png'

interface SceneProps {
    text: string,
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

    const textureLoader = useMemo(() => new THREE.TextureLoader(loadingManager),
        [matcap])

    const matcapTexture = textureLoader.load(matcap)

    // Fonts
    const fontLoader = useMemo(() => new THREE.FontLoader, [])

    const font1 = '../../static/fonts/helvetiker_regular.typeface.json'

    
    const textMaterial = <meshMatcapMaterial matcap={matcapTexture} />
    const text =
        <mesh position={[0,0,0]} ref={textRef}>
            {textMaterial}
        </mesh>

    fontLoader.load(
        font1,
        (font) => {
            console.log('font loaded')
            const textGeometry = new THREE.TextBufferGeometry(
            props.text, 
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
            textGeometry.center()
            

            if(textRef.current) {
                textRef.current.geometry = textGeometry
            }
        }
    )
    
    // Donuts
    const donuts = []
    const donutMaterial = <meshMatcapMaterial matcap={matcapTexture} />
    const donutGeometry = <torusBufferGeometry args={[.3, .2, 20, 45]} />

    for(let i = 0; i < 100; i++) {
        const donutRef = useRef<Mesh>()
        const x = (Math.random() - .5) * 10
        const y = (Math.random() - .5) * 10
        const z = (Math.random() - .5) * 10

        const rotateX = Math.random() * Math.PI 
        const rotateY = Math.random() * Math.PI

        const scale = Math.random()

        useFrame(() => {
            if (donutRef.current) donutRef.current.rotation.x = donutRef.current.rotation.y += 0.01
        })

        const donut = 
            <mesh 
                position={[x, y, z]} 
                scale={[scale, scale, scale]} 
                rotation={[rotateX, rotateY, 0]} 
                ref={donutRef}
            >
                {donutMaterial}
                {donutGeometry}
            </mesh>
    
        donuts.push(donut)
    
    }
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
            {/* <axesHelper /> */}
            {donuts}
            <CameraControls />
        </>
    )
}