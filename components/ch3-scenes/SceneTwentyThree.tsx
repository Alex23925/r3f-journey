import React, { useRef, useState, useEffect, Suspense } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import type { Mesh } from 'three'
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
                <FlightHelmet
                    helmetPositionX={props.helmetPositionX}
                    helmetPositionY={props.helmetPositionY}
                    helmetPositionZ={props.helmetPositionZ}
                    helmetRotationY={props.helmetRotationY}
                />
            </Suspense>
            <CameraControls />
        </scene>
    )
}