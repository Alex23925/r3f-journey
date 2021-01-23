import Layout from '../components/Layout'
import CanvasLayout from '../components/CanvasLayout'
import SceneTen from '../components/ch1-scenes/SceneTen'
import DatGui, { DatColor, DatNumber, DatSelect } from "react-dat-gui";
import React, { useState } from 'react'
// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import 'react-dat-gui/dist/index.scss'

export default function debugUI10() {
    // State
    const [params, setParams] = useState({
        elevation: "y",
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
                    <SceneTen color={params.color} hoverColor={params.hoverColor} />
                </CanvasLayout>

                <DatGui data={params} onUpdate={setParams}>
                    <DatColor path="color" />
                    <DatColor path="hoverColor" />
                </DatGui>

            </Layout>
        </>

    )
}
