import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MeshProps, useFrame, useResource, useThree } from 'react-three-fiber'
import { AmbientLight, DirectionalLight, Mesh, PointLight } from 'three'
import CameraControls from '../CameraControls'
import { useHelper } from "@react-three/drei"
import { DirectionalLightHelper } from 'three'
import * as THREE from 'three'

import img0 from '../../static/textures/door/color.jpg'
import img1 from '../../static/textures/door/alpha.jpg'
import img2 from '../../static/textures/door/height.jpg'
import img3 from '../../static/textures/door/normal.jpg'
import img4 from '../../static/textures/door/ambientOcclusion.jpg'
import img5 from '../../static/textures/door/metalness.jpg'
import img6 from '../../static/textures/door/roughness.jpg'

import brickimg1 from '../../static/textures/bricks/color.jpg'
import brickimg2 from '../../static/textures/bricks/ambientOcclusion.jpg'
import brickimg3 from '../../static/textures/bricks/normal.jpg'
import brickimg4 from '../../static/textures/bricks/roughness.jpg'

import grassimg1 from '../../static/textures/grass/color.jpg'
import grassimg2 from '../../static/textures/grass/ambientOcclusion.jpg'
import grassimg3 from '../../static/textures/grass/normal.jpg'
import grassimg4 from '../../static/textures/grass/roughness.jpg'

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
                castShadow={true}
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

    // Refs
    const doorRef = useRef<Mesh>()
    const wallsRef = useRef<Mesh>()

    const wall = useResource()
    console.log(wall.current)

    // Textures
    const loadingManager = useMemo(() => new THREE.LoadingManager(), [])

    const colorTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(img0), [img0])
    const alphaTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(img1), [img1])
    const heightTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(img2), [img2])
    const normalTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(img3), [img3])
    const ambientOcclusionTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(img4), [img4])
    const metalnessTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(img5), [img5])
    const roughnessTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(img6), [img6])

    // Brick Textures
    const brickColorTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(brickimg1), [brickimg1])
    const brickAmbientOcclusionTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(brickimg2), [brickimg2])
    const brickNormalTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(brickimg3), [brickimg3])
    const brickRoughnessTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(brickimg4), [brickimg4])

    // Walls
    const walls = 
        <mesh 
            receiveShadow={true} 
            castShadow={true}
            ref={wallsRef} 
            position={[0, 2.5/2, 0]}
        >
            <boxBufferGeometry args={[4, 2.5, 4]} />
            <meshPhysicalMaterial 
                map={brickColorTexture}
                aoMap={brickAmbientOcclusionTexture}
                normalMap={brickNormalTexture}
                roughnessMap={brickRoughnessTexture}
            />
        </mesh>

    if (wallsRef.current) {
        wallsRef.current.geometry.setAttribute(
            'uv2',
            new THREE.BufferAttribute(wallsRef.current.geometry.attributes.uv.array, 2))
        
    }
    
    // Roof
    const roof = 
        <mesh rotation-y={Math.PI/4} position={[0, 2.5 + 0.5, 0]}>
            <coneBufferGeometry args={[3.5, 1, 4]} />
            <meshStandardMaterial color={'#b35f45'} />
        </mesh>

    // Door
    const door = 
        <mesh ref={doorRef} position={[0, 1, 2.01]}>
            <planeBufferGeometry args={[2.2, 2.2, 100, 100]} />
            <meshStandardMaterial
                 map={colorTexture} 
                 transparent={true}
                 alphaMap={alphaTexture}
                 aoMap={ambientOcclusionTexture}
                 displacementMap={heightTexture}
                 displacementScale={0.1}
                 normalMap={normalTexture}
                 metalnessMap={metalnessTexture}
                 roughnessMap={roughnessTexture}
            />
        </mesh>

    if (doorRef.current) {
        doorRef.current.geometry.setAttribute(
            'uv2',
            new THREE.BufferAttribute(doorRef.current.geometry.attributes.uv.array, 2))
        
    }

    // Door Light
    const doorLight = <pointLight 
                        castShadow={true}
                        position={[0, 2.2, 2.7]}
                        color={'#ff7d46'} 
                        intensity={1} 
                        distance={7} />

    // Bushes
    const bushGeometry = <sphereBufferGeometry args={[1, 16, 16]} />
    const bushMaterial = <meshStandardMaterial color={'#89c854'} />

    const bush1 =
        <mesh castShadow={true} position={[.8, .2, 2.2]} scale={[.5, .5, .5]}>
            {bushGeometry}
            {bushMaterial}
        </mesh>

    const bush2 =
        <mesh castShadow={true} position={[1.4, .1, 2.1]} scale={[.25, .25, .25]}>
            {bushGeometry}
            {bushMaterial}
        </mesh>

    const bush3 =
        <mesh castShadow={true} position={[-.8, .1, 2.2]} scale={[.4, .4, .4]}>
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
            {doorLight}
            {bush1}
            {bush2}
            {bush3}
            {bush4}
        </group>
    )
}

export default function SceneSixteen(props: SceneProps) {
    const {scene} = useThree()

    // Refs
    const ambientRef = useRef()
    const directionalRef = useRef()
    const floorRef = useRef<Mesh>()
    const ghostRef1 = useRef<PointLight>()
    const ghostRef2 = useRef<PointLight>()
    const ghostRef3 = useRef<PointLight>()

    // Helpers
    useHelper(directionalRef, DirectionalLightHelper, 0.5, props.color)

    // Grass Textures
    const loadingManager = useMemo(() => new THREE.LoadingManager(), [])

    const grassColorTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(grassimg1), [grassimg1])
    const grassAmbientOcclusionTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(grassimg2), [grassimg2])
    const grassNormalTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(grassimg3), [grassimg3])
    const grassRoughnessTexture = useMemo(() => new THREE.TextureLoader(loadingManager).load(grassimg4), [grassimg4])

    grassColorTexture.repeat.set(8, 8)
    grassAmbientOcclusionTexture.repeat.set(8, 8)
    grassNormalTexture.repeat.set(8, 8)
    grassRoughnessTexture.repeat.set(8, 8)

    grassColorTexture.wrapS = THREE.RepeatWrapping
    grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
    grassNormalTexture.wrapS = THREE.RepeatWrapping
    grassRoughnessTexture.wrapS = THREE.RepeatWrapping

    grassColorTexture.wrapT = THREE.RepeatWrapping
    grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
    grassNormalTexture.wrapT = THREE.RepeatWrapping
    grassRoughnessTexture.wrapT = THREE.RepeatWrapping

    // Floor
    const floor =
        <mesh
            receiveShadow={true}
            ref={floorRef}
            rotation-x={-Math.PI * .5}
            position={[0, 0, 0]}
        >
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial 
                map={grassColorTexture}
                aoMap={grassAmbientOcclusionTexture}
                normalMap={grassNormalTexture}
                roughnessMap={grassRoughnessTexture}
            />
        </mesh>

    // if (floorRef.current) {
    //     floorRef.current.geometry.setAttribute(
    //         'uv2',
    //         new THREE.BufferAttribute(floorRef.current.geometry.attributes.uv.array, 2))

    // }

    //* Lights *\\

    // Ambient Light
    const ambientLight = <ambientLight 
                            ref={ambientRef}
                            color={'#b9d5ff'} 
                            intensity={props.ambientLightIntensity} 
                        />

    // Directional Light 
    const moonLight = <directionalLight
                            castShadow={true}
                            ref={directionalRef}
                            color={'#b9d5ff'} 
                            intensity={props.moonLightIntensity} 
                            position={[props.xPosition, props.yPosition, props.zPosition]}
                        />

    useEffect(() => {
        // Fog
        const fog = new THREE.Fog('#262837', 2, 15)
        scene.fog = fog

    }, [])

    // Ghosts
    const ghost1 = <pointLight castShadow={true} ref={ghostRef1} color={'#0000ff'} intensity={1} distance={3} />
    const ghost2 = <pointLight castShadow={true} ref={ghostRef2} color={'#00ffff'} intensity={1} distance={3} />
    const ghost3 = <pointLight castShadow={true} ref={ghostRef3} color={'#ffff00'} intensity={1} distance={3} />


    // Animations 
    useFrame((state) => {
        let time = state.clock.getElapsedTime()
        
        const ghostAngle = time * 0.5
        const ghostAngle2 = -time * 0.3
        const ghostAngle3 = -time * .18

        if (ghostRef1?.current && ghostRef2?.current && ghostRef3?.current) {
            ghostRef1.current.position.x = Math.cos(ghostAngle) * 4 
            ghostRef1.current.position.z = Math.sin(ghostAngle) * 4 
            ghostRef1.current.position.y = Math.sin(time * 3) 

            ghostRef2.current.position.x = Math.cos(ghostAngle2) * 4
            ghostRef2.current.position.z = Math.sin(ghostAngle2) * 4
            ghostRef2.current.position.y = Math.sin(time * 3) 

            ghostRef3.current.position.x = Math.cos(ghostAngle3) * 4
            ghostRef3.current.position.z = Math.sin(ghostAngle3) * 4
            ghostRef3.current.position.y = Math.sin(time * 3) 

        }

    })

    return (
        <scene>  
            <House position={[0, 0, 0]} />
            <Graves />
            {ghost1}
            {ghost2}
            {ghost3}
            {floor}
            {ambientLight}
            {moonLight}
            <CameraControls />
        </scene>
    )
}