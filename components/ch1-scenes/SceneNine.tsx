import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import type { Mesh } from 'three'
import CameraControls from '../CameraControls'

const Box: React.FC<MeshProps> = (props) => {

    const posititonArray = new Float32Array([
        0,0,0,
        0,1,0,
        1,0,1,
    ])
    
    const positionAttribute = new THREE.BufferAttribute(posititonArray, 3)

    // This reference will give us direct access to the mesh
    const mesh = useRef<Mesh>()

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Rotate mesh every frame, this is outside of React without overhead
    // useFrame(() => {
    //     if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    // })

    return (
        // threejs version looks like:
        // const geom = new THREE.BoxGeometry
        // const mat = new THREE.MeshBasicMaterial
        // const mesh = new THREE.Mesh(geom, mat)

        <mesh
            {...props}
            ref={mesh}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <bufferGeometry  />
            <meshStandardMaterial wireframe={true} color={hovered ? 'yellow' : 'red'} />
        </mesh>
    )
}


export default function SceneNine() {
    // Vertices
    let vertices: number[][] = [];

    // Faces
    const faces: number[][] = []
    
    for(let i = 0; i < 50; i++) {
        for(let j = 0; j < 3; j++) {
            vertices.push([
                (Math.random() - .5) * 4, 
                (Math.random() - .5) * 4, 
                (Math.random() - .5) * 4])
        }

        const verticesIndex = i * 3
        faces.push(
            [verticesIndex,
            verticesIndex + 1,
            verticesIndex + 2]
        )

    }

    

    return (
        <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[0, 0, 0]} />
            {/* <mesh>
                <geometry
                vertices={vertices.map(v => new THREE.Vector3(...v))}
                // ts error saying i am not passing enough arguments
                // when I am
                faces={faces.map(f => new THREE.Face3(...f))}
                />
                <meshStandardMaterial
                    wireframe={true} 
                    color={'red'} 
                 />
            </mesh> */}
            <CameraControls />
        </>
    )
}