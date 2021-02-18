import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import type { Mesh } from 'three'
import CameraControls from '../CameraControls'
import useStore from '../../hooks/store'
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
    elevation: number,
    color: string,
    hoverColor: string,
    wireframe: boolean
}

interface SphereProps {
    environmentMapTextures: THREE.CubeTexture
}

interface FloorProps extends SphereProps {}

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
            position={[0, elevation ,0]}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial wireframe={props.wireframe} color={hovered ? hoverColor : color} />
        </mesh>
    )
}

const Sphere = (props: SphereProps) => {    
    return (
        <mesh castShadow={true} position={[0, 0.5, 0]}>
            <sphereBufferGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial 
                metalness={0.3}
                roughness={0.4}
                envMap={props.environmentMapTextures}
            />
        </mesh>
        
    )
}

const Floor = (props: FloorProps) => {
    const environmentMapsTextures = useStore(set => set.images)

    return (
        <mesh receiveShadow={true} rotation-x={-Math.PI * 0.5}>
            <planeGeometry />
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
            <Sphere environmentMapTextures={environmentMapTexture}  />
            <Floor environmentMapTextures={environmentMapTexture} />
            <CameraControls />
        </scene>
    )
}