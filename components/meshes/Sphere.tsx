import React, { ReactNode } from 'react'
import { useFrame } from 'react-three-fiber'
import { useSphere } from '@react-three/cannon'
import * as THREE from 'three'

interface SphereProps {
    environmentMapTextures?: THREE.CubeTexture,
    sphereGeometry?: ReactNode,
    sphereMaterial?: ReactNode,
    radius?: number,
    position: number[]
}

const Sphere = (props: SphereProps) => {  
    //* Physics *\\
    const [sphereRef, api] = useSphere(() => ({ 
        position: props.position, 
        args: props.radius,
        mass: 10.0, 
    }))

    useFrame(() => {
        api.applyLocalForce([0, 0, 0], [0, 0, 0])
        api.applyForce([0, 0, 0], [0, 0, 0])
    })

    return (
        <mesh ref={sphereRef}  castShadow={true}>
            {props.sphereGeometry}
            {props.sphereMaterial}
        </mesh>
        
    )
}

export default Sphere