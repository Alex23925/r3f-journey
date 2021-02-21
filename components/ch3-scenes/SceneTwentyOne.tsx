import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react'
import { MeshProps, useFrame, useLoader } from 'react-three-fiber'
import type { Mesh } from 'three'
import { useGLTF } from '@react-three/drei'
import CameraControls from '../CameraControls'
import model from '../../static/models/Duck/glTF/Duck.gltf'
import '../../static/models/Duck/glTF/Duck0.bin'
import '../../static/models/Duck/glTF/DuckCM.png'

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
    wireframe: boolean
}

interface AssetProps {
    url: any
}


const Floor = () => {
    return (
        <mesh rotation-x={-Math.PI * 0.5} receiveShadow={true}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial
                color={'#444444'}
                metalness={0}
                roughness={0.5}
            />
        </mesh>
    )
}

const Lights = () => {
    return (
        <group>
            <ambientLight args={[0xffffff, 0.8]} />
            <directionalLight
                castShadow={true}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={15}
                shadow-camera-left={-7}
                shadow-camera-top={7}
                shadow-camera-bottom={-7}
                position={[5, 5, 5]}
                args={[0xffffff, 0.6]}
            />
        </group>
    )
}

const Asset = (props: AssetProps) => {
    const {scene} = useGLTF(props.url)
    return <primitive scale={[0.2, 0.2, 0.2]} object={scene} />
}

export default function SceneTwentyOne(props: SceneProps) {
    return (
        <> 
            <Suspense fallback={null}>
                <Asset url={model} />
            </Suspense>
            <Floor />
            <Lights />
            <CameraControls />
        </>
    )
}