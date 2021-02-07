import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import { AmbientLight, DirectionalLight, Mesh } from 'three'
import CameraControls from '../CameraControls'
import { useHelper } from "@react-three/drei"
import { DirectionalLightHelper } from 'three'
import * as THREE from 'three'

interface SceneProps {
    elevation: number,
    color: string,
    hoverColor: string,
    wireframe: boolean,
    ambientLightIntensity: number,
    moonLightIntensity: number,
    xPosition: number,
    yPosition: number,
    zPosition: number,
}

interface BoxProps {
    elevation: number,
    color: string,
    hoverColor: string,
    wireframe: boolean
}

interface HouseProps {
    position: number[]
}

const Graves = () => {
    const graves = []
    const graveGeometry = <boxBufferGeometry args={[.6, .8, .2]} />
    const graveMaterial = <meshStandardMaterial color={'#b2b6b1'} />

    for(let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = 3 + Math.random() * 6
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius
        
        const  grave = 
            <mesh 
                rotation-y={(Math.random() - 0.5) * 0.4}  
                rotation-z={(Math.random() - 0.5) * 0.4}
                position={[x, 0.3, z]}>
                {graveGeometry}
                {graveMaterial}
            </mesh>

        graves.push(grave)
    }

    return (
        <group>
            {graves}
        </group>
    )
}

const House = (props: HouseProps) => {

    // Walls
    const walls = 
        <mesh position={[0, 2.5/2, 0]}>
            <boxBufferGeometry args={[4, 2.5, 4]} />
            <meshPhysicalMaterial color={'#acBeB2'} />
        </mesh>
    
    // Roof
    const roof = 
        <mesh rotation-y={Math.PI/4} position={[0, 2.5 + 0.5, 0]}>
            <coneBufferGeometry args={[3.5, 1, 4]} />
            <meshStandardMaterial color={'#b35f45'} />
        </mesh>

    // Door
    const door = 
        <mesh position={[0, 1, 2.01]}>
            <planeBufferGeometry args={[2, 2]} />
            <meshStandardMaterial color={'*aa7b7b'} />
        </mesh>

    // Bushes
    const bushGeometry = <sphereBufferGeometry args={[1, 16, 16]} />
    const bushMaterial = <meshStandardMaterial color={'#89c854'} />

    const bush1 =
        <mesh position={[.8, .2, 2.2]} scale={[.5, .5, .5]}>
            {bushGeometry}
            {bushMaterial}
        </mesh>

    const bush2 =
        <mesh position={[1.4, .1, 2.1]} scale={[.25, .25, .25]}>
            {bushGeometry}
            {bushMaterial}
        </mesh>

    const bush3 =
        <mesh position={[-.8, .1, 2.2]} scale={[.4, .4, .4]}>
            {bushGeometry}
            {bushMaterial}
        </mesh>

    const bush4 =
        <mesh position={[-1, .05, 2.6]} scale={[.15, .15, .15]}>
            {bushGeometry}
            {bushMaterial}
        </mesh>

    return (
        <group>
            {roof}
            {walls}
            {door}
            {bush1}
            {bush2}
            {bush3}
            {bush4}
        </group>
    )
}

export default function SceneSixteen(props: SceneProps) {
    // Refs
    const ambientRef = useRef()
    const directionalRef = useRef()

    // Helpers
    useHelper(directionalRef, DirectionalLightHelper, 0.5, props.color)
    
    // Textures
    const loadingManager = useMemo(() => new THREE.LoadingManager(), [])
    const textureLoader = useMemo(() => new THREE.TextureLoader(loadingManager), [])


    // Floor
    const floor =
        <mesh
            rotation-x={-Math.PI * .5}
            position={[0, 0, 0]}
        >
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color={'#a9c388'} />
        </mesh>

    //* Lights *\\

    // Ambient Light
    const ambientLight = <ambientLight 
                            ref={ambientRef}
                            color={'#b9d5ff'} 
                            intensity={props.ambientLightIntensity} 
                        />

    // Directional Light 
    const moonLight = <directionalLight
                            ref={directionalRef}
                            color={'#b9d5ff'} 
                            intensity={props.moonLightIntensity} 
                            position={[props.xPosition, props.yPosition, props.zPosition]}
                        />

    return (
        <>  
            <House position={[0, 0, 0]} />
            <Graves />
            {floor}
            {ambientLight}
            {moonLight}
            <CameraControls />
        </>
    )
}