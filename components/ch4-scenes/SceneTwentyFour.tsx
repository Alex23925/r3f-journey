import React, { useRef, useMemo, useEffect } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import type { Mesh, PlaneBufferGeometry, PlaneGeometry } from 'three'
import CameraControls from '../CameraControls'
import vertex from '../../shaders/vertex.glsl'
import fragment from '../../shaders/fragment.glsl'
import * as THREE from 'three'

//* TIPS *\\
// bruno used a in front of aRandom for attribute so
// a = attribute
// u = uniform
// v = varying

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

export default function SceneTwentyFour(props: SceneProps) {
    
    const geometry  = useMemo(() => new THREE.PlaneBufferGeometry(1, 1, 32, 32), [])

    const count = geometry.attributes.position.count
    const randoms = new Float32Array(count)

    for(let i = 0; i < count; i++) {
        randoms[i] = Math.random()
    }

    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

    return (
        <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <mesh geometry={geometry}>
                <rawShaderMaterial 
                    vertexShader={vertex} 
                    fragmentShader={fragment} 
                    side={THREE.DoubleSide}
                />
            </mesh>
            <CameraControls />
        </>
    )
}