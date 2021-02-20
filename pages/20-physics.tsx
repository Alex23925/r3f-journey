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
import Box from '../components/meshes/Box'
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
    const numBoxes = useStore(state => state.numSpheres)
    const boxSize = useStore(state => state.boxSize)
    const setBoxesCopy = useStore(state => state.setBoxesCopy)
    const addBox = useStore(state => state.createBox)
    const removeBox = useStore(state => state.deleteBox)
    const increaseNumBoxes = useStore(state => state.increaseNumBoxes)
    const decreaseNumBoxes = useStore(state => state.decreaseNumBoxes)
    const setBoxSize = useStore(state => state.setBoxSize)

    // Sphere Geometry and Material
    let sphereGeometry = <sphereBufferGeometry args={[radius, 32, 32]} />
    const sphereMaterial = <meshStandardMaterial
                                metalness={0.3}
                                roughness={0.4}
                            />

    // Box Geometry and Material
    let boxGeometry = <boxBufferGeometry args={[boxSize, boxSize, boxSize]} />
    const boxMaterial = <meshStandardMaterial />
    
    // Sphere create/delete functions
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

    // Sphere create/delete functions
        function createBox() {
        setBoxSize()
        boxGeometry = <boxBufferGeometry args={[boxSize, boxSize, boxSize]} />

        addSphere(<Box
                    key={numBoxes} 
                    position={[
                        (Math.random()-.5) * 3, 
                        3, 
                        (Math.random()-.5) * 3
                    ]}
                    boxGeometry={boxGeometry}
                    boxMaterial= {boxMaterial}
                    size={boxSize}
                />)
        increaseNumBoxes()

        }

    function deleteBox() {
        setBoxesCopy()
        removeBox()
        decreaseNumBoxes()
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
                    <DatButton onClick={createBox} label="create box" />
                    <DatButton onClick={deleteBox} label="delete box" />
                    <DatNumber path="elevation" min={-3} max={3} step={.01} />
                    <DatColor path="color" />
                    <DatColor path="hoverColor" label="hover color" />
                    <DatBoolean path='wireframe' label='wireframe' />
                </DatGui>

            </Layout>
        </>

    )
}

