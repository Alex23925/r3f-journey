import React, { useRef, useState, useMemo, ReactNode } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import { Color, Mesh, MeshStandardMaterial, TetrahedronGeometry } from 'three'
import CameraControls from './CameraControls'
import * as THREE from 'three'
import useStore from '../hooks/store'

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
    material?: MeshStandardMaterial
    passRef?: any
}

const Particle = (props: ParticleProps) => {
    let pRef = props.passRef
    let s = 1
    let particlesGeometry
    let randomNum = Math.random()
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

    let particlesMesh = useMemo(() => new THREE.Mesh, [])
    particlesMesh.geometry = particlesGeometry

    return (
                <mesh ref={pRef} geometry={particlesGeometry}>
                    {props.material}
                </mesh>
            )

    
}

const Saturn = (props: SaturnProps) => {
    //Zustand State
    const randNum = useStore(state => state.randomNum)
    const setRandomNum = useStore(state => state.setRandomNumber)
    // Refs
    const saturnRef = useRef<Mesh>()
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
        let s = 1
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

    function rule3(v: any,vmin: any,vmax: any,tmin: any, tmax: any){
        var nv = Math.max(Math.min(v,vmax), vmin);
        var dv = vmax-vmin;
        var pc = (nv-vmin)/dv;
        var dt = tmax-tmin;
        var tv = tmin + (pc*dt);
        return tv;
  
    }


    //* PARTICLES *\\
     
    // Material
    let particlesMesh = useMemo(() => new THREE.Mesh, [])
    particlesMesh.geometry = getGeometry(Math.random())
    let particlesMaterial = useMemo(() => new THREE.MeshStandardMaterial, [])
    particlesMaterial.flatShading = true
    particlesMaterial.color = new THREE.Color('blue')
    particlesMaterial.roughness = .9
    particlesMaterial.emissive = useMemo(() => new THREE.Color(0x270000), [])

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
                >
                    {planetGeometry}
                    {planetMaterial}
                </mesh>

    //* RING *\\
    let numParticles = 0
    let distance
    let angleStep = (Math.PI*2)/(numParticles + 1)
    let asteroids = []
    
    // Saturn Animations
    useFrame(() => {
        if(saturnRef.current) {
            saturnRef.current.rotation.y-=.01
        }
    })
    
    // Asteroids Animations
    for(let i = numParticles; i < props.particles; i++) {
        const asteroidRef = useRef<Mesh>()
        let geometry = getGeometry(Math.random())
        const x = (Math.random() - .5) * 10
        const y = (Math.random() - .5) * 10
        const z = (Math.random() - .5) * 10
        randomN = Math.floor(Math.random() * 5)
        distance = props.innerRadius + Math.random()*(props.maxSize - props.minSize)
        console.log(distance, props.innerRadius, props.maxSize, props.minSize)
        planetMaterial = getMaterial(new THREE.Color(colors[randomN]))
        useFrame((state) => {
            let time = state.clock.getElapsedTime()
            if(i, asteroidRef.current) {
                let asteroid = asteroidRef.current
                asteroid.userData.angle += asteroid.userData.angularSpeed
                // console.log(child.userData.angle)
                let posX = Math.cos(asteroid.userData.angle)*asteroid.userData.distance
                let posZ = Math.sin(asteroid.userData.angle)*asteroid.userData.distance
                asteroid.position.x = posX
                asteroid.position.z = posZ
                asteroid.rotation.x += Math.random()*.05
                asteroid.rotation.y += Math.random()*.05
                asteroid.rotation.z += Math.random()*.05

                
                
            }
        })

        const asteroid = 
                <mesh 
                    ref={asteroidRef}
                    key={i}
                    userData={{
                        po: null,
                        distance: distance,
                        angle: angleStep*i,
                        angularSpeed: rule3(distance, props.innerRadius, props.outerRadius, props.minSpeed, props.maxSpeed) 
                    }}
                    geometry={geometry}
                    rotation-x={Math.random()*Math.PI}
                    rotation-y={Math.random()*Math.PI}
                    position={[0, (-2 + Math.random()) *4, 0]}
                >   
                {planetMaterial}
                </mesh>
        asteroids.push(asteroid)
    }

    return (
        <group>
            {planet}
            <mesh ref={ringRef}>   
                {asteroids}
            </mesh>
        </group>
    )
    
}

export default function SceneZero(props: SceneProps) {
    return (
        <>
            <directionalLight args={[0xffffff, 1.5]} />
            <pointLight
                position={[200, 100, 200]} 
                castShadow={true}
                shadow-camera-left={-400}
                shadow-camera-right ={400}
                shadow-camera-top={400}
                shadow-camera-bottom={-400}
                shadow-camera-near={1}
                shadow-camera-far={1000}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                
            />
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
            <CameraControls />
        </>
    )
}