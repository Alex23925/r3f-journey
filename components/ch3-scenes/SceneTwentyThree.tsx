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

import px from '../../static/textures/environmentMaps/0/px.png'
import nx from '../../static/textures/environmentMaps/0/nx.png'
import py from '../../static/textures/environmentMaps/0/py.png'
import ny from '../../static/textures/environmentMaps/0/ny.png'
import pz from '../../static/textures/environmentMaps/0/pz.png'
import nz from '../../static/textures/environmentMaps/0/nz.png'

interface SceneProps {
    lightIntensity: number,
    lightPositionX: number,
    lightPositionY: number,
    lightPositionZ: number,
    helmetPositionX: number,
    helmetPositionY: number,
    helmetPositionZ: number,
    helmetRotationY: number,
}

interface FlightHelmetProps {
    helmetPositionX: number,
    helmetPositionY: number,
    helmetPositionZ: number,
    helmetRotationY: number,
}

const Burger = () => {
    const {scene} = useGLTF(burgerUrl)
    return (
        <primitive scale={[0.5, 0.5, 0.5]} object={scene} />
    )
}

const FlightHelmet = (props : FlightHelmetProps) => {
    const {scene} = useGLTF(helmetUrl)
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

const Environment =  ({background = false}) => {
    const {gl, scene} = useThree() 
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

    scene.background = environmentMapTexture
    console.log(environmentMapTexture)
    return null
}

export default function SceneTwentyThree(props: SceneProps) {

    return (
        <scene>
            <directionalLight
                color={'#ffffff'}
                intensity={props.lightIntensity}
                position={[
                            props.lightPositionX, 
                            props.lightPositionY, 
                            props.lightPositionZ
                        ]}
            />
            <Suspense fallback={null}>
                <Environment background />
                {/* <FlightHelmet
                    helmetPositionX={props.helmetPositionX}
                    helmetPositionY={props.helmetPositionY}
                    helmetPositionZ={props.helmetPositionZ}
                    helmetRotationY={props.helmetRotationY}
                /> */}
                <Burger />
            </Suspense>
            <CameraControls />
        </scene>
    )
}