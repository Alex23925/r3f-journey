import React, { ReactNode,useRef, useState, useMemo, useEffect } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import type { Mesh } from 'three'
import CameraControls from '../CameraControls'
import useStore from '../../hooks/store'
import {Physics, useSphere, usePlane} from '@react-three/cannon'
import * as THREE from 'three'

import px from '../../static/textures/environmentMaps/0/px.png'
import nx from '../../static/textures/environmentMaps/0/nx.png'
import py from '../../static/textures/environmentMaps/0/py.png'
import ny from '../../static/textures/environmentMaps/0/ny.png'
import pz from '../../static/textures/environmentMaps/0/pz.png'
import nz from '../../static/textures/environmentMaps/0/nz.png'

interface SceneProps {
    elevation: number,
    color: string,
    hoverColor:string,
    wireframe: boolean
}

interface BoxProps {
    environmentMapTextures?: THREE.CubeTexture,
    boxMaterial?: ReactNode,
    boxGeometry?: ReactNode,
    size: number,
    position: number[]
}

interface FloorProps {
    environmentMapTextures: THREE.CubeTexture,
}


const Floor = (props: FloorProps) => {
    const environmentMapsTextures = useStore(set => set.images)

    //* Physics *\\
    const [planeRef, api] = usePlane(() => ({
        rotation: [-Math.PI * 0.5, 0, 0]
    }))

    return (
        <mesh ref={planeRef} receiveShadow={true}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial
                color={'#777777'}
                metalness={0.3}
                roughness={0.4}
                envMap={props.environmentMapTextures}
            />
        </mesh>
    )
}

export default function SceneTwenty(props: SceneProps) {
    //* Textures *\\
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

    //Zustand State
    const spheres = useStore(state => state.spheres)

    return (
        <scene>
            <ambientLight args={[0xffffff, 0.7]} />
            <directionalLight 
                castShadow={true}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far = {15}
                shadow-camera-left = {-7}
                shadow-camera-top = {7}
                shadow-camera-right = {7}
                shadow-camera-bottom = {-7}
                position={[5, 5, 5]}
            />
            <Physics 
                gravity={[0, -9.82, 0]}
                defaultContactMaterial={{friction: 0.1, restitution: .7}}
            >
                {spheres}
                <Floor environmentMapTextures={environmentMapTexture} />
            </Physics>
            <CameraControls />
        </scene>
    )
}