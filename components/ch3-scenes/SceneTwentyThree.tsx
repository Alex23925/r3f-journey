import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react'
import { MeshProps, useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'
import CameraControls from '../CameraControls'
import { useGLTF } from '@react-three/drei'
import burgerUrl from '../../static/models/burger.glb'
import helmetUrl from '../../static/models/FlightHelmet/glTF/FlightHelmet.gltf'
import '../../static/models/FlightHelmet/glTF/FlightHelmet.bin'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_GlassPlasticMat_BaseColor.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_GlassPlasticMat_Normal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_GlassPlasticMat_OcclusionRoughMetal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LeatherPartsMat_BaseColor.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LeatherPartsMat_Normal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LeatherPartsMat_OcclusionRoughMetal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LensesMat_BaseColor.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LensesMat_Normal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LensesMat_Normal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LensesMat_OcclusionRoughMetal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_MetalPartsMat_BaseColor.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_MetalPartsMat_Normal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_MetalPartsMat_OcclusionRoughMetal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_RubberWoodMat_BaseColor.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_RubberWoodMat_Normal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_RubberWoodMat_OcclusionRoughMetal.png'

import px from '../../static/textures/environmentMaps/0/px.jpg'
import nx from '../../static/textures/environmentMaps/0/nx.jpg'
import py from '../../static/textures/environmentMaps/0/py.jpg'
import ny from '../../static/textures/environmentMaps/0/ny.jpg'
import pz from '../../static/textures/environmentMaps/0/pz.jpg'
import nz from '../../static/textures/environmentMaps/0/nz.jpg'

interface SceneProps {
    lightIntensity: number,
    lightPositionX: number,
    lightPositionY: number,
    lightPositionZ: number,
    helmetPositionX: number,
    helmetPositionY: number,
    helmetPositionZ: number,
    helmetRotationY: number,
    envMapIntensity: number,
}

interface FlightHelmetProps {
    helmetPositionX: number,
    helmetPositionY: number,
    helmetPositionZ: number,
    helmetRotationY: number,
    envMap: THREE.CubeTexture,
    envMapIntensity: number,
}

interface EnvironmentProps {
    envMap: THREE.CubeTexture
}

const Burger = () => {
    const {scene} = useGLTF(burgerUrl)
    scene.traverse((child) => {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            console.log(child)
            child.castShadow = true
            child.receiveShadow = true 
        }
    })
    return (
        <primitive scale={[0.5, 0.5, 0.5]} object={scene} />
    )
}

const FlightHelmet = (props : FlightHelmetProps) => {
    const {scene} = useGLTF(helmetUrl)
    console.log(scene)
    scene.traverse((child) => {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            child.material.envMap = props.envMap
            child.material.envMapIntensity = props.envMapIntensity
            child.castShadow = true
            child.receiveShadow = true 
        }
    })
    return (
        <group rotation-y={props.helmetRotationY} position={[
                props.helmetPositionX,
                props.helmetPositionY, 
                props.helmetPositionZ
            ]}>
            <primitive scale={[10.5, 10.5, 10.5]} object={scene} />
        </group>
    )
}

const Environment =  (props : EnvironmentProps) => {
    const {gl, scene} = useThree() 
    scene.background = props.envMap
    return null
}

export default function SceneTwentyThree(props: SceneProps) {
    const loadingManager = useMemo(() => new THREE.LoadingManager(), [])
    const cubeTextureLoader = useMemo(() => new THREE.CubeTextureLoader(loadingManager), [
        px,
        nx,
        py,
        ny,
        pz,
        nz
    ])
    const environmentMapTexture = cubeTextureLoader.load([
        px,
        nx,
        py,
        ny,
        pz,
        nz
    ])

    environmentMapTexture.encoding = THREE.sRGBEncoding

    return (
        <scene>
            <directionalLight
                castShadow={true}
                color={'#ffffff'}
                shadow-normalBias={0.05}
                intensity={props.lightIntensity}
                position={[
                            props.lightPositionX, 
                            props.lightPositionY, 
                            props.lightPositionZ
                        ]}
            />
            <Suspense fallback={null}>
                <Environment
                    envMap={environmentMapTexture}
                />
                {/* <FlightHelmet
                    helmetPositionX={props.helmetPositionX}
                    helmetPositionY={props.helmetPositionY}
                    helmetPositionZ={props.helmetPositionZ}
                    helmetRotationY={props.helmetRotationY}
                    envMap={environmentMapTexture}
                    envMapIntensity={props.envMapIntensity}

                /> */}
                <Burger />
            </Suspense>
            <CameraControls />
        </scene>
    )
}