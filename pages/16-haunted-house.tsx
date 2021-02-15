import Layout from '../components/Layout'
import CanvasLayout from '../components/CanvasLayout'
import SceneSixteen from '../components/ch2-scenes/SceneSixteen'
import DatGui, { DatColor, DatBoolean, DatNumber } from "react-dat-gui";
import React, { useState, useMemo, useEffect } from 'react'
import * as THREE from 'three'
// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import 'react-dat-gui/dist/index.scss'

export default function hauntedHouse16() {
    // State
    const [params, setParams] = useState({
        elevation: 0,
        visible: true,
        wireframe: false,
        color: "#500EDF",
        hoverColor: "0xff0000",
        ambientLight: 0.12,
        moonLight: .12,
        xPosition: 0,
        yPosition: 5,
        zPosition: 0,
    })

    return (
        <>
            <Layout
                lessonName='09. Haunted House'
                lessonLink={'/16-haunted-house'}
                lessonNum={16}
                chNum={2}
            >
                <CanvasLayout cameraPosition={new THREE.Vector3(4,2,5)}>
                    <SceneSixteen
                        elevation={params.elevation}
                        wireframe={params.wireframe}
                        color={params.color}
                        hoverColor={params.hoverColor}
                        ambientLightIntensity={params.ambientLight}
                        moonLightIntensity={params.moonLight}
                        xPosition={params.xPosition}
                        yPosition={params.yPosition}
                        zPosition={params.zPosition}
                    />
                </CanvasLayout>

                {/* GUI EDITOR */}
                <DatGui data={params} onUpdate={setParams}>
                    <DatNumber path="elevation" min={-3} max={3} step={.01} />
                    <DatColor path="color" />
                    <DatColor path="hoverColor" label="hover color" />
                    <DatBoolean path='wireframe' label='wireframe' />
                    <DatNumber path="ambientLight" min={0} max={1} step={.001} label='ambient light intensity' />
                    <DatNumber path="moonLight" min={0} max={1} step={.001} label='moon light intensity' />
                    <DatNumber path="xPosition" min={-5} max={5} step={.001} label='x-position' />
                    <DatNumber path="yPosition" min={-5} max={5} step={.001} label='y-position' />
                    <DatNumber path="zPosition" min={-5} max={5} step={.001} label='z-position' />
                </DatGui>

            </Layout>
        </>

    )
}
