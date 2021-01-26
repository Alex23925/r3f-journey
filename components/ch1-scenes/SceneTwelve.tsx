import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import type { Mesh } from 'three'
import * as THREE from 'three'
import CameraControls from '../CameraControls'

import alphaImg from '../../static/textures/door/alpha.jpg'
import ambientOccImg from '../../static/textures/door/ambientOcclusion.jpg'
import colorImg from '../../static/textures/door/color.jpg'
import heightImg from '../../static/textures/door/height.jpg'
import metalnessImg from '../../static/textures/door/metalness.jpg'
import normalImg from '../../static/textures/door/normal.jpg'
import roughnessImg from '../../static/textures/door/roughness.jpg'

import gradient from '../../static/textures/gradients/3.jpg'
import matcap from '../../static/textures/matcaps/8.png'

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
    wireframe: boolean,
}


export default function SceneTwelve(props: SceneProps) {

    // Refs
    const sphereRef = useRef<Mesh>()
    const planeRef = useRef<Mesh>()
    const torusRef = useRef<Mesh>()

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
        [
            colorImg,
            alphaImg,
            ambientOccImg,
            heightImg,
            metalnessImg,
            roughnessImg,
            normalImg
        ])

    const doorColorTexture = textureLoader.load(colorImg)
    const doorAlphaTexture = textureLoader.load(alphaImg)
    const doorAmbientOcclusionTexture = textureLoader.load(ambientOccImg)
    const doorHeightTexture = textureLoader.load(heightImg)
    const doorMetalnessTexture = textureLoader.load(metalnessImg)
    const doorRoughnessTexture = textureLoader.load(roughnessImg)
    const doorNormalTexture = textureLoader.load(normalImg)
    const matcapTexture = textureLoader.load(matcap)
    const gradientTexture = textureLoader.load(gradient)

    


    // Material
    // const material = <meshBasicMaterial 
    //                     map={doorColorTexture} 
    //                     alphaMap={doorAlphaTexture}
    //                     side={THREE.DoubleSide}
    //                     transparent={true}
    //                     wireframe={props.wireframe}
    //                     color={props.color}
    //                  />

    const material = <meshNormalMaterial />

    // Meshes
    const sphere =
        <mesh ref={sphereRef} position={[-1.5, 0, 0]} >
            <sphereBufferGeometry args={[.5, 16, 16]} />
            {material}
        </mesh>

    const plane =
        <mesh ref={planeRef} >
            <planeBufferGeometry args={[1, 1]} />
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

        if (sphereRef?.current && planeRef?.current && torusRef?.current) {
            sphereRef.current.rotation.y = .15 * time
            planeRef.current.rotation.y = .15 * time
            torusRef.current.rotation.y = .15 * time
        }


        if (sphereRef?.current && planeRef?.current && torusRef?.current) {
            sphereRef.current.rotation.x = .15 * time
            planeRef.current.rotation.x = .15 * time
            torusRef.current.rotation.x = .15 * time
        }

    })

    return (
        <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {sphere}
            {plane}
            {torus}
            <CameraControls />
        </>
    )
}