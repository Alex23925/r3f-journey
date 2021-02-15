import React, { useRef, useState, useMemo, useEffect } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import type { Mesh, Points } from 'three'
import CameraControls from '../CameraControls'
import * as THREE from 'three'

import img1 from '../../static/textures/particles/8.png'

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

interface ParticleProps {
    size: number,
    color: string
}

interface GalaxyProps {
    size: number,
    color: string
}

export default function SceneEighteen(props: SceneProps) {
    return (
        <scene>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Particles size={.05} color={props.color} />
            <CameraControls />
        </scene>
    )
}

const Galaxy = (props: GalaxyProps) => {
}

const Particles = (props: ParticleProps) => {

    //Ref 
    const particlesRef = useRef<Points>()

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

    const textureLoader = useMemo(() => new THREE.TextureLoader(loadingManager), [img1])

    const particleTexture = textureLoader.load(img1)

    const count = 500

    // Attributes (vertices, colors, faces etc.)
    // Multiplying by 3  twice b/c each triangle need three vertices which need 3 values(x,y,z)
    const positionArray = new Float32Array(count * 3)
    const colorArray = new Float32Array(count * 3)

    for(let i = 0; i < count * 3; i++){
        positionArray[i] = (Math.random() - .5) * 10
        colorArray[i] = Math.random()
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
                                alphaMap={particleTexture}
                                vertexColors={true}
                                size={props.size} 
                                sizeAttenuation={true} 
                            />

    // Animations 
    useFrame((state) => {
        let time = state.clock.getElapsedTime()

        for(let i = 0; i < count; i++) {
            // to get x y or z
            // [x, y, z] = [i3+0, i3+1, i3+2]
            // ex. x = i3 + 0
            const i3 = i * 3
            
            //ts error will fix later
            const x = particlesGeometry.attributes.position.array[i3 + 0]
            particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(time + x)
            
        }

        particlesGeometry.attributes.position.needsUpdate =  true
    })

    const particles = 
        <points ref={particlesRef} geometry={particlesGeometry}>
            {particleMaterial}
        </points>

        return (
            <group>
                {particles}
            </group>
        )

}
