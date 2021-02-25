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
        hoverColor: "#1326F9",
        innerRadius: 30,
        outerRadius: 50,
        particles: 250,
        minSpeed: 0.005,
        maxSpeed: 0.026,
        minSize: .01,
        maxSize: 2
    })


    return (
        <>
            <Layout
                lessonName='00. Playground'
                lessonNum={0}
                lessonLink={'/00-playground'}
                chNum={1}
            >
                <CanvasLayout cameraPosition={new THREE.Vector3(0,0,100)}>
                    <SceneZero 
                        elevation={params.elevation}
                        wireframe={params.wireframe} 
                        color={params.color} 
                        hoverColor={params.hoverColor}
                        innerRadius={params.innerRadius}
                        outerRadius={params.outerRadius}
                        particles={params.particles}
                        minSpeed={params.minSpeed}
                        maxSpeed={params.maxSpeed}
                        minSize={params.minSize}
                        maxSize={params.maxSize}
                    />
                </CanvasLayout>

                <DatGui data={params} onUpdate={setParams}>
                    <DatNumber path="elevation" min={-3} max={3} step={.01} />
                    <DatColor path="color" />
                    <DatColor path="hoverColor" label="hover color" />
                    <DatBoolean path='wireframe' label='wireframe' />
                    <DatNumber path="innerRadius" min={20} max={60} step={1} label={'inner Radius'} />
                    <DatNumber path="outerRadius" min={40} max={100} step={1} label={'outer Radius'} />
                    <DatNumber path="particles" min={10} max={800} step={1} label={'particles'} />
                    <DatNumber path="minSpeed" min={.005} max={.05} step={.01} label={'min Speed'} />
                    <DatNumber path="maxSpeed" min={.005} max={.05} step={.01} label={'max Speed'} />
                    <DatNumber path="minSize" min={.01} max={5} step={.01} label={'min Size'} />
                    <DatNumber path="maxSize" min={.01} max={5} step={.01} label={'max Size'} />
                </DatGui>

            </Layout>
        </>

    )
}
