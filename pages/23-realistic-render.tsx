import Layout from '../components/Layout'
import CanvasLayout from '../components/CanvasLayout'
import DatGui, { DatColor, DatBoolean, DatNumber } from "react-dat-gui"
import React, { useState, useMemo, Suspense } from 'react'
import {useThree} from 'react-three-fiber'
import * as THREE from 'three'
// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import 'react-dat-gui/dist/index.scss'
import SceneTwentyThree from '../components/ch3-scenes/SceneTwentyThree'

import px from '../static/textures/environmentMaps/0/px.png'
import nx from '../static/textures/environmentMaps/0/nx.png'
import py from '../static/textures/environmentMaps/0/py.png'
import ny from '../static/textures/environmentMaps/0/ny.png'
import pz from '../static/textures/environmentMaps/0/pz.png'
import nz from '../static/textures/environmentMaps/0/nz.png'

const Environment =  ({background = false}) => {
    const {gl, scene} = useThree() 
    const loadingManager = useMemo(() => new THREE.LoadingManager(), [])
    const cubeTextureLoader = useMemo(() => new THREE.CubeTextureLoader(loadingManager), [
        px,
        nx,
        py,
        ny,
        pz,
        nz
    ])
    const environmentMapTexture = cubeTextureLoader.load([
        px,
        nx,
        py,
        ny,
        pz,
        nz
    ])

    scene.background = environmentMapTexture
    console.log(environmentMapTexture)
    return null
}

export default function realisticRender23() {
    // State
    const [params, setParams] = useState({
        lightIntensity: 1,
        lightPositionX: .25,
        lightPositionY: 3,
        lightPositionZ: -2.25,
        helmetPositionX: 0,
        helmetPositionY: -4,
        helmetPositionZ: 0,
        helmetRotationY: Math.PI * .5,
    })


    return (
        <>
            <Layout
                lessonName='23. Realistic Render'
                lessonLink={'/23-realistic-render'}
                lessonNum={10}
                chNum={1}
            >
                <CanvasLayout cameraPosition={new THREE.Vector3(4, 1, -4)}>
                    <Suspense fallback={null}>
                        {/* <Environment /> */}
                        <SceneTwentyThree 
                            lightIntensity={params.lightIntensity}
                            lightPositionX={params.lightPositionX}
                            lightPositionY={params.lightPositionY}
                            lightPositionZ={params.lightPositionZ}
                            helmetPositionX={params.helmetPositionX}
                            helmetPositionY={params.helmetPositionY}
                            helmetPositionZ={params.helmetPositionZ}
                            helmetRotationY={params.helmetRotationY}
                        />
                    </Suspense>
                </CanvasLayout>

                <DatGui data={params} onUpdate={setParams}>
                    <DatNumber path="lightIntensity" min={0} max={10} step={.001} label='intensity' />
                    <DatNumber path="lightPositionX" min={-5} max={5} step={.001} label='light position x' />
                    <DatNumber path="lightPositionY" min={-5} max={5} step={.001} label='light position y' />
                    <DatNumber path="lightPositionZ" min={-5} max={5} step={.001} label='light position z' />
                    <DatNumber path="helmetPositionX" min={-5} max={5} step={.001} label='helmet position x' />
                    <DatNumber path="helmetPositionY" min={-5} max={5} step={.001} label='helmet position y' />
                    <DatNumber path="helmetPositionZ" min={-5} max={5} step={.001} label='helmet position z' />
                    <DatNumber path="helmetRotationY" min={-Math.PI} max={Math.PI} step={.001} label='helmet rotation y' />
                </DatGui>

            </Layout>
        </>

    )
}
