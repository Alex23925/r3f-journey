import Layout from "../components/Layout";
import CanvasLayout from "../components/CanvasLayout";
import DatGui, { DatColor, DatBoolean, DatNumber } from "react-dat-gui";
import React, { useState } from "react";
import * as THREE from "three";
// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import "react-dat-gui/dist/index.scss";
import SceneTwentyFive from "../components/ch4-scenes/SceneTwentyFive";

//* TIPS *\\
// bruno used a in front of aRandom for attribute so
// a = attribute
// u = uniform
// v = varying

//* LEARN TO MAKE A SPHERE THAT RIPPLES WHEN CLICKED WITH SHADERS *\\

export default function shaderPatterns25() {
    // State
    const [params, setParams] = useState({
        elevation: 0,
        visible: true,
        wireframe: false,
        color: "0xff0000",
        hoverColor: "0xff0000",
        uFrequencyX: 10,
        uFrequencyY: 10,
    });

    return (
        <>
            <Layout
                lessonName=".17 Shader Patterns"
                lessonLink="/25-shader-patterns"
                lessonNum={10}
                chNum={1}
            >
                <CanvasLayout cameraPosition={new THREE.Vector3(0, 0, 1)}>
                    <SceneTwentyFive
                        elevation={params.elevation}
                        wireframe={params.wireframe}
                        color={params.color}
                        hoverColor={params.hoverColor}
                        uFrequencyX={params.uFrequencyX}
                        uFrequencyY={params.uFrequencyY}
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
                    <DatColor path="color" />
                    <DatColor path="hoverColor" label="hover color" />
                    <DatBoolean path="wireframe" label="wireframe" />
                </DatGui>
            </Layout>
        </>
    );
}
