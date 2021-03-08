import Layout from '../components/Layout'
import CanvasLayout from '../components/CanvasLayout'
import DatGui, { DatColor, DatBoolean, DatNumber } from "react-dat-gui";
import React, { useState } from 'react'
import * as THREE from 'three'
// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import 'react-dat-gui/dist/index.scss'
import SceneTwentyFour from '../components/ch4-scenes/SceneTwentyFour';

export default function debugUI10() {
    // State
    const [params, setParams] = useState({
        elevation: 0,
        visible: true,
        wireframe: false,
        color: "0xff0000",
        hoverColor: "0xff0000"
    })


    return (
        <>
            <Layout
                lessonName='.03 Debug UI'
                lessonLink='/24-shaders'
                lessonNum={10}
                chNum={1}
            >
                <CanvasLayout cameraPosition={new THREE.Vector3(0, 0, 2)}>
                    <SceneTwentyFour 
                        elevation={params.elevation}
                        wireframe={params.wireframe} 
                        color={params.color} 
                        hoverColor={params.hoverColor} 
                    />
                </CanvasLayout>

                <DatGui data={params} onUpdate={setParams}>
                    <DatNumber path="elevation" min={-3} max={3} step={.01} />
                    <DatColor path="color" />
                    <DatColor path="hoverColor" label="hover color" />
                    <DatBoolean path='wireframe' label='wireframe' />
                </DatGui>

            </Layout>
        </>

    )
}
