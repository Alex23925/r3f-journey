import Layout from '../components/Layout'
import CanvasLayout from '../components/CanvasLayout'
import DatGui, { DatColor, DatBoolean, DatNumber, DatString } from "react-dat-gui";
import React, { useState } from 'react'
// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import 'react-dat-gui/dist/index.scss'
import SceneThirteen from '../components/ch1-scenes/SceneThirteen';

export default function text13() {
    // State
    const [params, setParams] = useState({
        text: 'Hello ThreeJS',
        elevation: 0,
        visible: true,
        wireframe: false,
        color: "0xff0000",
        hoverColor: "0xff0000"
    })


    return (
        <>
            <Layout
                lessonName='First Lesson'
                lessonNum={0}
                chNum={1}
            >
                <CanvasLayout>
                    <SceneThirteen
                        text={params.text}
                        elevation={params.elevation}
                        wireframe={params.wireframe}
                        color={params.color}
                        hoverColor={params.hoverColor}
                    />
                </CanvasLayout>

                <DatGui data={params} onUpdate={setParams}>
                    <DatNumber path="elevation" min={-3} max={3} step={.01} />
                    <DatString path="text" label="3D Text" />
                    <DatColor path="color" />
                    <DatColor path="hoverColor" label="hover color" />
                    <DatBoolean path='wireframe' label='wireframe' />
                </DatGui>

            </Layout>
        </>

    )
}
