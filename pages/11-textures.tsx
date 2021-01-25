import Layout from '../components/Layout'
import CanvasLayout from '../components/CanvasLayout'
import SceneEleven from '../components/ch1-scenes/SceneEleven'
import DatGui, { DatColor, DatBoolean, DatNumber } from "react-dat-gui"
import React, { useState, Suspense, useMemo } from 'react'
// NOTE
// DatGUI missing for some reason styling so have to import it
// If using scss go to that file path and change the css extension to scss
import 'react-dat-gui/dist/index.scss'



export default function textures11() {
    // State
    const [params, setParams] = useState({
        elevation: 0,
        visible: true,
        wireframe: false,
        color: "#C02626",
        hoverColor: "#2645C0"
    })

    return (
        <>
            <Layout
                lessonName='First Lesson'
                lessonNum={0}
                chNum={1}
            >
                <CanvasLayout>
                    <Suspense fallback={null}>
                        <SceneEleven
                            elevation={params.elevation}
                            color={params.color}
                            hoverColor={params.hoverColor}
                            wireframe={params.wireframe}
                        />
                    </Suspense>
                </CanvasLayout>

                {/* GUI */}
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
