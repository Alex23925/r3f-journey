import React, { ReactNode, useMemo } from 'react'
import { useFrame } from 'react-three-fiber'
import { useBox } from '@react-three/cannon'
import * as THREE from 'three'
import hitSound from '../../static/sounds/hit.mp3'

interface BoxProps {
    environmentMapTextures?: THREE.CubeTexture,
    boxMaterial?: ReactNode,
    boxGeometry?: ReactNode,
    size: number,
    position: number[]
}

const Box = (props: BoxProps) => {  
    const sound = useMemo(() => new Audio(hitSound), [])
    
    //* Physics *\\
    const [boxRef, api] = useBox(() => ({ 
        position: props.position, 
        args: [props.size, props.size, props.size],
        mass: 10.0, 
        onCollide: e => {
            if(sound)
                sound.play()
        }
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