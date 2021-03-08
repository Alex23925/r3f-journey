import React, { useRef, useState, useMemo, useEffect, ReactNode, Suspense } from 'react'
import { MeshProps, useFrame, useThree } from 'react-three-fiber'
import { Camera, CameraHelper, Group, Mesh, PerspectiveCamera, TetrahedronGeometry, Usage, Vector3 } from 'three'
import CameraControls from './CameraControls'
import * as THREE from 'three'
import {  useGLTF } from '@react-three/drei'
import burgerUrl from '../static/models/burger.glb'
import { useHelper, Html } from '@react-three/drei'
import '../styles/playground.scss'

//* ALL CREDIT GOES TO KARIM MAALOUL ON CODEPEN *\\

interface SceneProps {
    elevation: number,
    color: string,
    hoverColor:string,
    wireframe: boolean,
    innerRadius: number,
    outerRadius: number,
    particles: number,
    minSpeed: number,
    maxSpeed: number,
    minSize: number,
    maxSize: number
}

interface SaturnProps extends SceneProps {}

interface ParticleProps {
    geometry?: any
    material: ReactNode
    passRef?: any
    innerRadius: number,
    outerRadius: number,
    particles: number,
    minSpeed: number,
    maxSpeed: number,
    minSize: number,
    maxSize: number,
    i: number
}

function rule3(v: any,vmin: any,vmax: any,tmin: any, tmax: any){
        var nv = Math.max(Math.min(v,vmax), vmin);
        var dv = vmax-vmin;
        var pc = (nv-vmin)/dv;
        var dt = tmax-tmin;
        var tv = tmin + (pc*dt);
        return tv;
  
    }

const Burger = () => {
    const burgerRef =  useRef<Group>()
    const {scene} = useGLTF(burgerUrl)
    scene.traverse((child) => {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            child.castShadow = true
            child.receiveShadow = true 
        }
    })

    useFrame(() => {
        if(burgerRef.current) {
            burgerRef.current.rotation.y-=.005
        }
    })

    return (
        <group rotation-x={Math.PI/6} position-y={-12} receiveShadow={true} ref={burgerRef}>
            <primitive scale={[2.5, 2.5, 2.5]} object={scene} />
        </group>
    )
}

const Asteroid = (props: ParticleProps) => {
    let asteroidRef = useRef<Mesh>()
    let i = props.i

    // solution might me to use zustand state to store hover and camera.lookAt
    const {camera, setDefaultCamera} = useThree()

    // Refs 
    const cameraRef = useRef<PerspectiveCamera>()
    // userData
    let numParticles = 0
    let distance  = props.innerRadius + Math.random()*(props.outerRadius - props.innerRadius)
    let angleStep = (Math.PI*2)/(numParticles + 1)

    // Variables
    let s = props.maxSize
    let slowNum = 1
    let clickedObject = ' '
    let posY = (-2 + Math.random()) *4

    // State
    let clicked = false 

    //Helpers
    //useHelper(cameraRef, CameraHelper, 0.2)

    useFrame((state) => {
            let time = state.clock.getElapsedTime()
            if(asteroidRef.current && cameraRef.current) {
                let asteroid = asteroidRef.current
                let cam = cameraRef.current
                asteroid.userData.angle += (asteroid.userData.angularSpeed/slowNum)
                cam.userData.angle += (cam.userData.angularSpeed/slowNum)
                // console.log(child.userData.angle)
                // let posX = Math.cos(asteroid.userData.angle)*asteroid.userData.distance
                // let posZ = Math.sin(asteroid.userData.angle)*asteroid.userData.distance

                let camPosX = Math.cos(cam.userData.angle)*cam.userData.distance
                let camPosZ = Math.sin(cam.userData.angle)*cam.userData.distance
                // asteroid.position.x = posX
                // asteroid.position.z = posZ
                asteroid.rotation.x += Math.random()*.05
                asteroid.rotation.y += Math.random()*.05
                asteroid.rotation.z += Math.random()*.05
                asteroid.scale.set(s,s,s)
                cam.lookAt(new Vector3(0, 0, 0))
                cam.position.x = camPosX 
                cam.position.y =  posY
                cam.position.z = camPosZ              
                }
            }
        )
  
        // for orbit controls maybe nest a camera within a camera so one is spinning and the other can me moved freely
        
    return (
        <perspectiveCamera
            ref={cameraRef} 
            userData={{
                    po: null,
                    distance: distance,
                    angle: angleStep*props.i,
                    angularSpeed: rule3(distance, props.innerRadius, props.outerRadius, props.minSpeed, props.maxSpeed) 
                }}
            position={[0, 0, 0]}
            near={.1}
            far={250}
        >
            <mesh 
                castShadow={true}
                ref={asteroidRef}
                key={i}
                name={i.toString()}
                userData={{
                    po: null,
                    distance: distance,
                    angle: angleStep*props.i,
                    angularSpeed: rule3(distance, props.innerRadius, props.outerRadius, props.minSpeed, props.maxSpeed) 
                }}
                onClick={(event) => {
                    clicked = clicked === false ? true : false
                    console.log(clicked)
                     if(cameraRef.current && asteroidRef.current) {
                        setDefaultCamera(cameraRef.current)
                    }
                }}
                onPointerOver={(event) => {
                    slowNum = 10
                    s = props.maxSize + .5
                }}
                onPointerOut={(event) =>{
                    slowNum = 1 
                    s = props.maxSize
                }}
                geometry={props.geometry}
                rotation-x={Math.random()*Math.PI}
                rotation-y={Math.random()*Math.PI}
                position={[0, 0, -12]}
                scale={[s, s, s]}
            >
                {props.material}
                <Html scaleFactor={10}>
                    <div className="asteroid">
                        Asteroid
                    </div>
                </Html>
            </mesh>
        </perspectiveCamera>
    ) 

}

const Saturn = (props: SaturnProps) => {

    // Refs
    const saturnRef = useRef<Mesh>()

    // Variables
    let s = props.maxSize

    // Helpers
    function getMaterial(color : THREE.Color){
        let material = <meshStandardMaterial 
                    flatShading={true}
                    color={color}
                    roughness={.9}
                    emissive={new THREE.Color(0x270000)}
                  />
        // our material is a phong material, with no shininess (highlight) and a black specular
        return material
    }

    function getGeometry(num : number) {
        let particlesGeometry
        let randomNum = num
        if (randomNum<.25){
            // Cube
            particlesGeometry = useMemo(() => new THREE.BoxGeometry(s,s,s), [])

        }else if (randomNum < .5){
            // Pyramid
            particlesGeometry = useMemo(() => new THREE.CylinderGeometry(0,s,s*2, 4, 1), [])

        }else if (randomNum < .75){
            // potato shape
            particlesGeometry = useMemo(() => new THREE.TetrahedronGeometry(s,2), [])

        }else{
            // thick plane
            particlesGeometry = useMemo(() => new THREE.BoxGeometry(s/6,s,s), [])
        }

        return particlesGeometry
    }

    //* PLANET *\\
    // Refs
    const planetGeometryRef = useRef<TetrahedronGeometry>()
    const ringRef = useRef<Mesh>()
    // Geometry
    const planetGeometry = <tetrahedronGeometry ref={planetGeometryRef} args={[20, 2]} />

    let noise = 5
    if(planetGeometryRef.current) {
        for(let i=0; i<planetGeometryRef.current.vertices.length; i++) {
            let v = planetGeometryRef.current.vertices[i]
            v.x += -noise/2 + Math.random()*noise
            v.y += -noise/2 + Math.random()*noise
            v.z += -noise/2 + Math.random()*noise
        }
    }

    // Material
    let planetMaterial =  getMaterial(new THREE.Color('orange'))
    let colors = ['blue', 'yellow', 'orange', 'green']
    let randomN = Math.random() * 5
    const planet = 
                <mesh 
                    ref={saturnRef}
                    castShadow={true}
                    receiveShadow={true}
                    rotation-x={.2} 
                    rotation-z={.2}
                    onClick={(event) => console.log(event)}
                >
                    {planetGeometry}
                    {planetMaterial}
                </mesh>

    // Saturn Animations
    useFrame(() => {
        if(saturnRef.current) {
            saturnRef.current.rotation.y-=.01
        }
    })
    
    //* RING *\\
    let numParticles = 0
    let asteroids : any = []
  

    for(let i = numParticles; i < props.particles; i++) {
        randomN = Math.floor(Math.random() * 5)
        planetMaterial = getMaterial(new THREE.Color(colors[randomN]))
        asteroids.push(
            <Asteroid 
                geometry={getGeometry(Math.random())} 
                material={planetMaterial}
                innerRadius={props.innerRadius}
                particles={props.particles}
                minSpeed={props.minSpeed}
                maxSpeed={props.maxSpeed}
                minSize={props.minSize}
                maxSize={props.maxSize}
                outerRadius={props.outerRadius}
                i={i}
            />
        )
    }
    
    return (
        <group>
            <Burger />
            <mesh ref={ringRef}>   
                {asteroids}
            </mesh>
        </group>
    )
    
}

export default function SceneZero(props: SceneProps) {
    return (
        <scene>
            <ambientLight args={[0x663344, 2]} />
            <directionalLight
                shadow-normalBias={7.5}
                position={[200, 100, 200]} 
                castShadow={true}
                shadow-camera-left={-400}
                shadow-camera-right ={400}
                shadow-camera-top={400}
                shadow-camera-bottom={-400}
                shadow-camera-near={1}
                shadow-camera-far={1000}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                
            />
            <Suspense  fallback={null}>
                <Saturn
                    elevation={props.elevation} 
                    color={props.color} 
                    hoverColor={props.hoverColor} 
                    wireframe={props.wireframe}
                    innerRadius={props.innerRadius}
                    outerRadius={props.outerRadius}
                    particles={props.particles}
                    minSpeed={props.minSpeed}
                    maxSpeed={props.maxSpeed}
                    minSize={props.minSize}
                    maxSize={props.maxSize}
                />
            </Suspense>
            <CameraControls />
        </scene>
    )
}