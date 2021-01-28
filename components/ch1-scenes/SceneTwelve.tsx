import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import { Material, Mesh, PlaneBufferGeometry } from 'three'
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

import environmentRight from '../../static/textures/environmentMaps/0/px.jpg'
import environmentLeft from '../../static/textures/environmentMaps/0/nx.jpg'
import environmentTop from '../../static/textures/environmentMaps/0/py.jpg'
import environmentBottom from '../../static/textures/environmentMaps/0/ny.jpg'
import environmentFront from '../../static/textures/environmentMaps/0/pz.jpg'
import environmentBack from '../../static/textures/environmentMaps/0/nz.jpg'

interface SceneProps {
    elevation: number,
    color: string,
    hoverColor: string,
    wireframe: boolean,
    metalness: number,
    roughness: number,
    aoIntensity: number,
    displacementScale:  number,
}

interface BoxProps {
    elevation: number,
    color: string,
    hoverColor: string,
    wireframe: boolean,
}


export default function SceneTwelve(props: SceneProps) {

    // Refs
    const materialRef = useRef<Material>()
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

    const cubeTextureLoader = useMemo(() => new THREE.CubeTextureLoader(), [])

    const doorColorTexture = textureLoader.load(colorImg)
    const doorAlphaTexture = textureLoader.load(alphaImg)
    const doorAmbientOcclusionTexture = textureLoader.load(ambientOccImg)
    const doorHeightTexture = textureLoader.load(heightImg)
    const doorMetalnessTexture = textureLoader.load(metalnessImg)
    const doorRoughnessTexture = textureLoader.load(roughnessImg)
    const doorNormalTexture = textureLoader.load(normalImg)
    const matcapTexture = textureLoader.load(matcap)
    const gradientTexture = textureLoader.load(gradient)
    gradientTexture.minFilter = THREE.NearestFilter
    gradientTexture.magFilter = THREE.NearestFilter
    
    const environmentMapTexture = cubeTextureLoader.load([
        environmentRight,
        environmentLeft,
        environmentTop,
        environmentBottom,
        environmentFront,
        environmentBack
    ])

    // Material
    // const material = <meshBasicMaterial 
    //                     map={doorColorTexture} 
    //                     alphaMap={doorAlphaTexture}
    //                     side={THREE.DoubleSide}
    //                     transparent={true}
    //                     wireframe={props.wireframe}
    //                     color={props.color}
    //                  />

    const material = <meshStandardMaterial 
                            // color={props.color} 
                            roughness={props.roughness} 
                            metalness={props.metalness} 
                            envMap={environmentMapTexture}
                            // aoMap={doorAmbientOcclusionTexture}
                            // map={doorColorTexture}
                            // aoMapIntensity={props.aoIntensity}
                            // displacementMap={doorHeightTexture}
                            // displacementScale={props.displacementScale}
                            // metalnessMap={doorMetalnessTexture}
                            // roughnessMap={doorRoughnessTexture}
                            // normalMap={doorNormalTexture}
                            // alphaMap={doorAlphaTexture}
                            // transparent={true}
                            wireframe={props.wireframe}
                    />

    // Meshes
    // typescript giving me attribute errors even tho they exist as functions
    const sphere =
        <mesh ref={sphereRef} position={[-1.5, 0, 0]} >
            <sphereBufferGeometry args={[.5, 64, 64]} />
            {material}
        </mesh>

    if (sphereRef.current) {
        sphereRef.current.geometry.setAttribute(
            'uv2',
            new THREE.BufferAttribute(sphereRef.current.geometry.attributes.uv.array, 2))
        console.log(sphereRef.current.geometry.attributes.uv.array)
    }

    const plane =
        <mesh ref={planeRef} >
            <planeBufferGeometry args={[1, 1, 100, 100]} />
            {material}
        </mesh>

    if(planeRef.current) {
        planeRef.current.geometry.setAttribute(
            'uv2', 
            new THREE.BufferAttribute(planeRef.current.geometry.attributes.uv.array,2))
        console.log(planeRef.current.geometry.attributes.uv.array)
    }

    const torus =
        <mesh ref={torusRef} position={[1.5, 0, 0]} >
            <torusBufferGeometry args={[.3, .2, 64, 128]} />
            {material}
        </mesh>

    if (torusRef.current) {
        torusRef.current.geometry.setAttribute(
            'uv2',
            new THREE.BufferAttribute(torusRef.current.geometry.attributes.uv.array, 2))
        console.log(torusRef.current.geometry.attributes.uv.array)
    }

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
            <pointLight intensity={.5} position={[2, 3, 4]} />
            
            {sphere}
            {plane}
            {torus}
            <CameraControls />
        </>
    )
}