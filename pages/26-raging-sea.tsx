import Layout from "../components/Layout";
import CanvasLayout from "../components/CanvasLayout";
import DatGui, { DatColor, DatBoolean, DatNumber } from "react-dat-gui";
import React, { useState } from "react";
import * as THREE from "three";
// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import "react-dat-gui/dist/index.scss";
import SceneTwentySix from "../components/ch4-scenes/SceneTwentySix";

//* TIPS *\\
// bruno used a in front of aRandom for attribute so
// a = attribute
// u = uniform
// v = varying

//* LEARN TO MAKE A SPHERE THAT RIPPLES WHEN CLICKED WITH SHADERS *\\

export default function ragingSea26() {
    // State
    const [params, setParams] = useState({
        elevation: 0,
        visible: true,
        wireframe: false,
        color: "#9bd8ff",
        depthColor: "#186691",
        uColorOffset: 0.08,
        uColorMultiplier: 5,
        uFrequencyX: 4,
        uFrequencyY: 1.5,
        uBigWavesElevation: 0.2,
        uBigWavesSpeed: 0.75,
    });

    return (
        <>
            <Layout
                lessonName=".19 Shader Patterns"
                lessonLink="/26-raging-sea"
                lessonNum={10}
                chNum={1}
            >
                <CanvasLayout cameraPosition={new THREE.Vector3(1.2, 1.2, 1.2)}>
                    <SceneTwentySix
                        elevation={params.elevation}
                        wireframe={params.wireframe}
                        color={params.color}
                        depthColor={params.depthColor}
                        uColorOffset={params.uColorOffset}
                        uColorMultiplier={params.uColorMultiplier}
                        uFrequencyX={params.uFrequencyX}
                        uFrequencyY={params.uFrequencyY}
                        uBigWavesElevation={params.uBigWavesElevation}
                        uBigWavesSpeed={params.uBigWavesSpeed}
                    />
                </CanvasLayout>

                <DatGui data={params} onUpdate={setParams}>
                    <DatNumber path="elevation" min={-3} max={3} step={0.01} />
                    <DatNumber
                        path="uFrequencyX"
                        min={0}
                        max={20}
                        step={0.01}
                    />
                    <DatNumber
                        path="uFrequencyY"
                        min={0}
                        max={20}
                        step={0.01}
                    />
                    <DatNumber
                        path="uBigWavesElevation"
                        min={0}
                        max={1}
                        step={0.001}
                    />
                    <DatNumber
                        path="uBigWavesSpeed"
                        min={0}
                        max={5}
                        step={0.001}
                    />
                    <DatNumber
                        path="uColorMultiplier"
                        min={0}
                        max={10}
                        step={0.001}
                    />
                    <DatNumber
                        path="uColorOffset"
                        min={0}
                        max={5}
                        step={0.001}
                    />
                    <DatColor path="color" />
                    <DatColor path="depthColor" label="depth color" />
                    <DatBoolean path="wireframe" label="wireframe" />
                </DatGui>
            </Layout>
        </>
    );
}
