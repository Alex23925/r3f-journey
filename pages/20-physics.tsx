import Layout from '../components/Layout'
import CanvasLayout from '../components/CanvasLayout'
import SceneTwenty from '../components/ch3-scenes/SceneTwenty'
import DatGui, { DatColor, DatBoolean, DatNumber, DatButton } from "react-dat-gui";
import React, { ReactNode, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import useStore from '../hooks/store'
import {useSphere} from '@react-three/cannon'
import {useFrame} from 'react-three-fiber'
import Sphere from '../components/meshes/Sphere'

import px from '../static/textures/environmentMaps/0/px.png'
import nx from '../static/textures/environmentMaps/0/nx.png'
import py from '../static/textures/environmentMaps/0/py.png'
import ny from '../static/textures/environmentMaps/0/ny.png'
import pz from '../static/textures/environmentMaps/0/pz.png'
import nz from '../static/textures/environmentMaps/0/nz.png'

// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import 'react-dat-gui/dist/index.scss'
import { Mesh } from 'three';

interface SphereProps {
    environmentMapTextures?: THREE.CubeTexture,
    sphereGeometry?: ReactNode,
    sphereMaterial?: ReactNode,
    radius?: number,
    position: number[]
}

interface BoxProps {
    environmentMapTextures?: THREE.CubeTexture,
    boxMaterial?: ReactNode,
    boxGeometry?: ReactNode,
    size: number,
    position: number[]
}

export default function debugUI10() {
    //* Zustand State *\\
    // Sphere
    const numSpheres = useStore(state => state.numSpheres)
    const radius = useStore(state => state.radius)
    const setSpheresCopy = useStore(state => state.setSpheresCopy)
    const addSphere = useStore(state => state.createSphere)
    const removeSphere = useStore(state => state.deleteSphere)
    const increaseNumSpheres = useStore(state => state.increaseNumSpheres)
    const decreaseNumSpheres = useStore(state => state.decreaseNumSpheres)
    const setRadius = useStore(state => state.setRadius)
    
    // Box

    // Sphere Geometry and Material
    let sphereGeometry = <sphereBufferGeometry args={[radius, 32, 32]} />
    const sphereMaterial = <meshStandardMaterial
                                metalness={0.3}
                                roughness={0.4}
                            />

    // Box Geometry and Material
    
    
    function createSphere() {
        setRadius()
        sphereGeometry = <sphereBufferGeometry args={[radius, 32, 32]} />

        addSphere(<Sphere
                    key={numSpheres} 
                    position={[
                        (Math.random()-.5) * 3, 
                        3, 
                        (Math.random()-.5) * 3
                    ]}
                    sphereGeometry={sphereGeometry}
                    sphereMaterial= {sphereMaterial}
                    radius={radius} 
                />)
        increaseNumSpheres()

        }
    
    function deleteSphere() {
        setSpheresCopy()
        removeSphere()
        decreaseNumSpheres()
    } 

    // Dat State
    const [params, setParams] = useState({
        elevation: 0,
        visible: true,
        wireframe: false,
        color: "0xff0000",
        hoverColor: "0xff0000",
    })


    return (
        <>
            <Layout
                lessonName='20. Physics'
                lessonLink={'/20-physics'}
                lessonNum={10}
                chNum={1}
            >
                <CanvasLayout  cameraPosition={new THREE.Vector3(-5, 3, 7)}>
                    <SceneTwenty 
                        elevation={params.elevation}
                        wireframe={params.wireframe} 
                        color={params.color} 
                        hoverColor={params.hoverColor}
                    />
                </CanvasLayout>

                <DatGui data={params} onUpdate={setParams}>
                    <DatButton onClick={createSphere} label="create sphere" />
                    <DatButton onClick={deleteSphere} label="delete sphere" />
                    <DatNumber path="elevation" min={-3} max={3} step={.01} />
                    <DatColor path="color" />
                    <DatColor path="hoverColor" label="hover color" />
                    <DatBoolean path='wireframe' label='wireframe' />
                </DatGui>

            </Layout>
        </>

    )
}

