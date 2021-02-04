import Layout from '../components/Layout'
import CanvasLayout from '../components/CanvasLayout'
import SceneFourteen from '../components/ch2-scenes/SceneFourteen'
import DatGui, { DatColor, DatBoolean, DatNumber } from "react-dat-gui";
import React, { useState } from 'react'
// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import 'react-dat-gui/dist/index.scss'

export default function lights14() {
    // State
    const [params, setParams] = useState({
        elevation: 0,
        visible: true,
        wireframe: false,
        color: "#FFFFFF",
        hoverColor: "#1B3EA4",
        metalness: 0.7,
        roughness: 0.2,
        aoIntensity: 0,
        displacementScale: 0,
    })


    return (
        <>
            <Layout
                lessonName='First Lesson'
                lessonNum={0}
                chNum={1}
            >
                <CanvasLayout>
                    <SceneFourteen
                        elevation={params.elevation}
                        wireframe={params.wireframe}
                        color={params.color}
                        hoverColor={params.hoverColor}
                        metalness={params.metalness}
                        roughness={params.roughness}
                        aoIntensity={params.aoIntensity}
                        displacementScale={params.displacementScale}
                    />
                </CanvasLayout>

                <DatGui data={params} onUpdate={setParams}>
                    <DatNumber path="elevation" min={-3} max={3} step={.01} />
                    <DatColor path="color" />
                    <DatColor path="hoverColor" label="hover color" />
                    <DatBoolean path="wireframe" label="wireframe" />
                    <DatNumber path="metalness" label="metalness" min={0} max={1} step={.0001} />
                    <DatNumber path="roughness" label="roughness" min={0} max={1} step={.0001} />
                    <DatNumber path="aoIntensity" label="ambient occlusion intensity" min={0} max={10} step={.0001} />
                    <DatNumber path="displacementScale" label="displacement Scale" min={0} max={1} step={.001} />
                </DatGui>

            </Layout>
        </>

    )
}
