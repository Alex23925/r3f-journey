import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MeshProps, useFrame, useThree, Vector2 } from 'react-three-fiber'
import { Mesh, Vector3 } from 'three'
import CameraControls from '../CameraControls'
import * as THREE from 'three'

interface SceneProps {
    elevation: number,
    color: string,
    hoverColor:string,
    wireframe: boolean
}


export default function SceneNineteen(props: SceneProps) {
    const {camera} = useThree()
    // State 
    const [mouse, setMouse] = useState<THREE.Vector2>()

    // Ref
    const obj1Ref = useRef<Mesh>()
    const obj2Ref = useRef<Mesh>()
    const obj3Ref = useRef<Mesh>()

    const raycaster = useMemo(() => new THREE.Raycaster, [])

    let currentIntersection = null

    //* Animation *\\
    useFrame((state) => {
        let time = state.clock.getElapsedTime()
        
        if(obj1Ref.current && obj2Ref.current && obj3Ref.current) {
            obj1Ref.current.position.y = Math.sin(time * 0.3) * 1.5 
            obj2Ref.current.position.y = Math.sin(time * 0.8) * 1.5
            obj3Ref.current.position.y = Math.sin(time * 1.4) * 1.5
        }

        // Cast Ray
        const rayOrigin = new THREE.Vector3(-3, 0, 0)
        const rayDirection = new THREE.Vector3(1, 0, 0)
        rayDirection.normalize()

        if(mouse) {
            raycaster.setFromCamera(mouse, camera)
        }

        if(obj1Ref.current && obj2Ref.current && obj3Ref.current) {
            const objectsToTest = [obj1Ref.current, obj2Ref.current, obj3Ref.current]
            const intersects = raycaster.intersectObjects(objectsToTest)

            for(const intersect of intersects)
            {
                intersect.object.material.color.set('#0000ff')
                intersect.object.scale.set(2, 2, 2)
            }

            for(const object of objectsToTest)
            {
                if(!intersects.find(intersect => intersect.object === object))
                {
                    object.material.color.set('#ff0000')
                    object.scale.set(1, 1, 1)
                }
            }
        }

    })

    useEffect(() => {
        const mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX / window.innerWidth * 2 - 1
            mouse.y = -(e.clientY / window.innerHeight * 2 - 1)
            
            setMouse(mouse)
        })
    }, [])

    return (
        <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <mesh ref={obj1Ref} position={[-2, 0, 0]}>
                <sphereGeometry args={[.5, 16, 16]} />
                <meshBasicMaterial wireframe={props.wireframe} color={'#ff0000'} />
            </mesh>

            <mesh ref={obj2Ref} position={[0, 0, 0]}>
                <sphereGeometry args={[.5, 16, 16]} />
                <meshBasicMaterial wireframe={props.wireframe} color={'#ff0000'} />
            </mesh>

            <mesh ref={obj3Ref} position={[2, 0, 0]}>
                <sphereGeometry args={[.5, 16, 16]} />
                <meshBasicMaterial wireframe={props.wireframe} color={'#ff0000'} />
            </mesh>
            <CameraControls />
        </>
    )
}