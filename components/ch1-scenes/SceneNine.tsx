import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import type { Mesh } from 'three'
import CameraControls from '../CameraControls'

const Box: React.FC<MeshProps> = (props) => {
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
        // THREEJS version looks like:
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
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshBasicMaterial wireframe={true} color={hovered ? 'yellow' : 'red'} />
        </mesh>
    )
}

const Geometry: React.FC<MeshProps> = () => {

    const count = 500
    // Multiplying by 3  twice b/c each triangle need three vertices which need 3 values(x,y,z)
    const positionArray = new Float32Array(count * 3 * 3)

    for(let i = 0; i < count * 3 * 3; i++){
        positionArray[i] = Math.random() - .5
    }

    const positionAttribute = useMemo(() => {
        const posAttribute = new THREE.BufferAttribute(positionArray, 3)
        return posAttribute
    }, [positionArray]) 

    const geometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry()
        return geometry
    },[positionAttribute])

    geometry.setAttribute('position', positionAttribute)

    return (
        // THREEJS version looks like:
        // const geom = new THREE.BoxGeometry
        // const mat = new THREE.MeshBasicMaterial
        // const mesh = new THREE.Mesh(geom, mat)

        <mesh geometry={geometry} >
            <meshBasicMaterial wireframe={true} color={'blue'} />
        </mesh>
    )
}

export default function SceneNine() {
    // Vertices
    let vertices: number[][] = [];

    // Faces
    const faces: number[][] = []

    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 3; j++) {
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
            {/* <Box position={[0, 0, 0]} /> */}
            <Geometry />
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