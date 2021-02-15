import Layout from '../components/Layout'
import CanvasLayout from '../components/CanvasLayout'
import SceneZero from '../components/SceneZero'
import DatGui, { DatColor, DatBoolean, DatNumber } from "react-dat-gui";
import React, { useState } from 'react'
import * as THREE from 'three'
// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import 'react-dat-gui/dist/index.scss'

export default function playground00() {
    // State
    const [params, setParams] = useState({
        elevation: 0,
        visible: true,
        wireframe: false,
        color: "#F235C9",
        hoverColor: "#1326F9"
    })


    return (
        <>
            <Layout
                lessonName='00. Playground'
                lessonNum={00}
                chNum={1}
            >
                <CanvasLayout cameraPosition={new THREE.Vector3(0,0,2.5)}>
                    <SceneZero 
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