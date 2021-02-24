import React, { useRef, useState, useMemo, ReactNode } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import { Color, Mesh, MeshStandardMaterial, TetrahedronGeometry } from 'three'
import CameraControls from './CameraControls'
import * as THREE from 'three'

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


    //* PARTICLES *\\
    let pRef = useRef<Mesh>()
    let s = 5
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
    let particlesMaterial = useMemo(() => new THREE.MeshStandardMaterial, [])
    particlesMaterial.flatShading = true
    particlesMaterial.color = new THREE.Color('blue')
    particlesMaterial.roughness = .9
    particlesMaterial.emissive = useMemo(() => new THREE.Color(0x270000), [])
    let particle

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
    const planetMaterial =  getMaterial(new THREE.Color('orange'))

    const planet = 
                <mesh>
                    {planetGeometry}
                    {planetMaterial}
                </mesh>

    //* RING *\\
    let numParticles = 0
    let particleRef = useRef<Mesh>()
    let asteroids = []
    let p
    
        for(let i = numParticles; i < props.particles; i++) {
            p = <mesh 
                    key={i}
                    material={particlesMaterial} 
                    geometry={particlesGeometry}
                    rotation-x={Math.random()*Math.PI}
                    rotation-y={Math.random()*Math.PI}
                    position={[0, -2 + Math.random() *4, 0]}
                >   
                </mesh>
            asteroids.push(p)
            if(particleRef.current) {
                console.log("typeof " + particleRef.current)
                particleRef.current.rotation.x = Math.random()*Math.PI
                particleRef.current.rotation.y = Math.random()*Math.PI
                particleRef.current.position.y = -2 + Math.random() *4
                ringRef.current?.add(particleRef.current)
                }
                    
            } 

    return (
        <group>
            
            <mesh ref={ringRef}>   
                {asteroids}
            </mesh>
        </group>
    )
    
}

export default function SceneZero(props: SceneProps) {
    return (
        <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
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
                minSize={props.minSpeed}
                maxSize={props.maxSize}
            />
            <CameraControls />
        </>
    )
}