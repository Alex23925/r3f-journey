import Layout from '../components/Layout'
import CanvasLayout from '../components/CanvasLayout'
import SceneFifteen from '../components/ch2-scenes/SceneFifteen'
import DatGui, { DatColor, DatBoolean, DatNumber } from "react-dat-gui";
import React, { useState, Suspense } from 'react'
import * as THREE from 'three'
// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import 'react-dat-gui/dist/index.scss'

export default function shadows15() {
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
                lessonName='08. Shadows'
                lessonLink={'/15-shadows'}
                lessonNum={15}
                chNum={2}
            >
                <CanvasLayout  cameraPosition={new THREE.Vector3(0, 0, 3)}>
                    <Suspense fallback={null}>
                        <SceneFifteen
                            elevation={params.elevation}
                            wireframe={params.wireframe}
                            color={params.color}
                            hoverColor={params.hoverColor}
                            metalness={params.metalness}
                            roughness={params.roughness}
                            aoIntensity={params.aoIntensity}
                            displacementScale={params.displacementScale}
                        />
                    </Suspense>
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
