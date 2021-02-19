import React, { ReactNode } from 'react'
import { useFrame } from 'react-three-fiber'
import { useBox } from '@react-three/cannon'
import * as THREE from 'three'

interface BoxProps {
    environmentMapTextures?: THREE.CubeTexture,
    boxMaterial?: ReactNode,
    boxGeometry?: ReactNode,
    size: number,
    position: number[]
}

const Box = (props: BoxProps) => {  
    //* Physics *\\
    const [boxRef, api] = useBox(() => ({ 
        position: props.position, 
        args: [props.size, props.size, props.size],
        mass: 10.0, 
    }))

    useFrame(() => {
        api.applyLocalForce([0, 0, 0], [0, 0, 0])
        api.applyForce([0, 0, 0], [0, 0, 0])
    })

    return (
        <mesh ref={boxRef}  castShadow={true}>
            {props.boxGeometry}
            {props.boxMaterial}
        </mesh>
        
    )
}

export default Box