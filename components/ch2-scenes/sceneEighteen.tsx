import React, { useRef, useState, useMemo, useEffect } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import type { Mesh, Points } from 'three'
import CameraControls from '../CameraControls'
import * as THREE from 'three'

import img1 from '../../static/textures/particles/8.png'

interface SceneProps {
    color: string,
    hoverColor:string,
    size: number,
    count: number,
    radius: number,
    branches: number,
    spin: number,
    randomness: number,
    randomnessPower: number,
    insideColor: string,
    outsideColor: string
}

interface GalaxyProps extends SceneProps{}

export default function SceneEighteen(props: SceneProps) {
    return (
        <scene>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* <Particles size={.05} color={props.color} /> */}
            <Galaxy
                color={props.color}
                hoverColor={props.hoverColor}
                size={props.size}
                count={props.count} 
                radius={props.radius}
                branches={props.branches}
                spin={props.spin}
                randomness={props.randomness}
                randomnessPower={props.randomnessPower}
                insideColor={props.insideColor}
                outsideColor={props.outsideColor}
            />
            {/* <axesHelper /> */}
            <CameraControls />
        </scene>
    )
}

const Galaxy = (props: GalaxyProps) => {

    //variables
    let angle = 0

    // Refs
    const pointsRef = useRef<Points>()

    // Textures
    const loadingManager = useMemo(() => new THREE.LoadingManager(), [])
    const textureLoader = useMemo(() => new THREE.TextureLoader(loadingManager), [img1])
    const particleTexture = textureLoader.load(img1)

    // Particles
    const positionArray = new Float32Array(props.count * 3)
    const colorArray = new Float32Array(props.count * 3)

    const colorInside = useMemo(() => new THREE.Color(props.insideColor), [])
    const colorOutside = useMemo(() => new THREE.Color(props.outsideColor), [])
    
    useFrame((state)=> {
        let time = state.clock.getElapsedTime()
        if(pointsRef.current) {
            pointsRef.current.rotation.y = -time / 2
        }
        for(let i = 0; i < props.count; i++){
            const i3 = i * 3

            // Position
            const radius = Math.random() * props.radius
            const spinAngle = radius * props.spin

            // use mod(%) so we only go from 0 to the number of branches (0-branches)
            const branchAngle = ((i % props.branches) / props.branches) * 2 * Math.PI

            // const randomY = Math.pow(Math.random(), props.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

            const x = particlesGeometry.attributes.position.array[i3 + 0] 
            const z = particlesGeometry.attributes.position.array[i3 + 2]
            const xPolar = radius * Math.cos(angle)
            const zPolar = radius * Math.sin(angle)
            // particlesGeometry.attributes.position.array[i3 + 0] = xPolar
            // particlesGeometry.attributes.position.array[i3 + 2] = zPolar
            // angle += 1

            
        }
        particlesGeometry.attributes.position.needsUpdate = true
    })

    for(let i = 0; i < props.count; i++){
        const i3 = i * 3

        // Position
        const radius = Math.random() * props.radius
        const spinAngle = radius * props.spin
        // use mod(%) so we only go from 0 to the number of branches (0-branches)
        const branchAngle = ((i % props.branches) / props.branches) * 2 * Math.PI

        // use randomness to get weird double galaxy effect
        const randomX = (Math.pow(Math.random(), props.randomnessPower) * (Math.random() < 0.5 ? 1 : -1))/ radius
        const randomY = (Math.pow(Math.random(), props.randomnessPower) * (Math.random() < 0.5 ? 1 : -1))
        const randomZ = (Math.pow(Math.random(), props.randomnessPower) * (Math.random() < 0.5 ? 1 : -1))/ radius

        positionArray[i3 + 0] = (Math.cos(branchAngle + spinAngle) * radius + randomX) // x
        positionArray[i3 + 1] = 0 + randomY/radius  // y
        positionArray[i3 + 2] = (Math.sin(branchAngle + spinAngle) * radius + randomZ) // z
        // positionArray[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius // x
        // positionArray[i3 + 1] = 0  // y
        // positionArray[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius // z

        // Color
        // colorArray[i] = Math.random()
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius/ props.radius)

        colorArray[i3 + 0] = mixedColor.r // r
        colorArray[i3 + 1] = mixedColor.g // g
        colorArray[i3 + 2] = mixedColor.b // b
        
    }

    // Position Attribute
    const positionAttribute = useMemo(() => {
        const posAttribute = new THREE.BufferAttribute(positionArray, 3)
        return posAttribute
    }, [positionArray]) 

    // Color Attribute 
    const colorAttribute = useMemo(() => {
        const colorAttribute = new THREE.BufferAttribute(colorArray, 3)
        return colorAttribute
    }, [colorArray])

    // Buffer Geometry
    const particlesGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry()
        return geometry
    },[positionAttribute])

    particlesGeometry.setAttribute('position', positionAttribute)
    particlesGeometry.setAttribute('color', colorAttribute)

    const particleMaterial = <pointsMaterial 
                                // depthTest={false}
                                blending={THREE.AdditiveBlending}
                                depthWrite={false} 
                                transparent={true}
                                vertexColors={true}
                                alphaMap={particleTexture}
                                size={props.size} 
                                sizeAttenuation={true} 
                            />

    
    const particles = 
        <points ref={pointsRef} rotation-x={Math.PI / 12} geometry={particlesGeometry}>
            {particleMaterial}
        </points>

        return (
            <group>
                {particles}
            </group>
        )
}
