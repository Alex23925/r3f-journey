import Layout from '../components/Layout'
import CanvasLayout from '../components/CanvasLayout'
import DatGui, { DatColor, DatBoolean, DatNumber } from "react-dat-gui"
import SceneEighteen from '../components/ch2-scenes/sceneEighteen'
import React, { useState, useEffect } from 'react'
import * as THREE from 'three'
// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import 'react-dat-gui/dist/index.scss'
import useStore from '../hooks/store'

export default function galaxy18() {
    // Dat GUI State
    const [params, setParams] = useState({
        color: "0xff0000",
        hoverColor: "0xff0000",
        size: .05,
        count: 10000,
        radius:5,
        branches: 3,
        spin: 1,
        randomness: .02,
        randomnessPower: 3,
        insideColor: '#ff6030',
        outsideColor: '#1b3984',
    })

    // Zustand State
    

    return (
        <>
            <Layout
                lessonName='18. Galaxy Generator'
                lessonLink='/18-galaxy'
                lessonNum={18}
                chNum={2}
            >
                <CanvasLayout cameraPosition={new THREE.Vector3(0, 2, 8)}>
                    <SceneEighteen
                        color={params.color} 
                        hoverColor={params.hoverColor} 
                        size={params.size}
                        count={params.count}
                        radius={params.radius}
                        branches={params.branches}
                        spin={params.spin}
                        randomness={params.randomness}
                        randomnessPower={params.randomnessPower}
                        insideColor={params.insideColor}
                        outsideColor={params.outsideColor}
                    />
                </CanvasLayout>

                <DatGui data={params} onUpdate={setParams}>
                    <DatColor path="color" />
                    <DatColor path="hoverColor" label="hover color" />
                    <DatColor path="insideColor" label="inside color" />
                    <DatColor path="outsideColor" label="outside color" />
                    <DatNumber path="size" min={0.01} max={.1} step={.001} />
                    <DatNumber path="radius" min={1} max={10} step={.01} />
                    <DatNumber path="branches" min={1} max={10} step={1} />
                    <DatNumber path="spin" min={-5} max={5} step={1} />
                    <DatNumber path="randomness" min={0} max={2} step={.001} />
                    <DatNumber path="randomnessPower" min={1} max={10} step={1} />
                    <DatNumber path="count" min={100} max={100000} step={100} label={'number of particles'} />
                </DatGui>

            </Layout>
        </>

    )
}
