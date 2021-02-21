import React, { ReactNode, useEffect, useState, useMemo } from 'react'
import { useFrame } from 'react-three-fiber'
import { useSphere } from '@react-three/cannon'
import * as THREE from 'three'
import hitSound from '../../static/sounds/hit.mp3'



interface SphereProps {
    environmentMapTextures?: THREE.CubeTexture,
    sphereGeometry?: ReactNode,
    sphereMaterial?: ReactNode,
    radius?: number,
    position: number[]
}

const Sphere = (props: SphereProps) => {  
     const sound = useMemo(() => new Audio(hitSound), [])

    //* Physics *\\
    const [sphereRef, api] = useSphere(() => ({ 
        position: props.position, 
        args: props.radius,
        mass: 10.0, 
        onCollide: (e : any) => {
            const impactStrength = e.contact.impactVelocity
            
            if(impactStrength > 1.5) 
                sound.volume = Math.random()
                sound.play()
        }
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