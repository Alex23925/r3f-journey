import Layout from "../components/Layout";
import CanvasLayout from "../components/CanvasLayout";
import { useControls } from "leva";
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
    // LEVA
    const { elevation } = useControls({
        elevation: {
            value: 0,
            min: -3,
            max: 3,
            step: .01,
        },
    });
    const { visible } = useControls({ visible:false });
    const { wireframe } = useControls({ wireframe: false });
    const { color } = useControls({ color: "#9bd8ff" });
    const { depthColor } = useControls({ depthColor: "#186691" });
    const { uColorOffset } = useControls({
        uColorOffset: {
            value: 0.08,
            min: 0,
            max: 5,
            step: 0.01,
        },
    });
    const { uColorMultiplier } = useControls({
        uColorMultiplier: {
            value: 5,
            min: 0,
            max: 10,
            step: 0.01,
        },
    });
    const { uFrequencyX } = useControls({
        uFrequencyX: {
            value: 4,
            min: 0,
            max: 10,
            step: 0.01,
        },
    });
    const { uFrequencyY } = useControls({
        uFrequencyY: {
            value: 1.5,
            min: 0,
            max: 20,
            step: 0.01,
        },
    });
    const { uBigWavesElevation } = useControls({
        uBigWavesElevation: {
            value: 0.2,
            min: 0,
            max: 1,
            step: 0.01,
        },
    });
    const { uBigWavesSpeed } = useControls({
        uBigWavesSpeed: {
            value: 0.75,
            min: 0,
            max: 5,
            step: 0.01,
        },
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
                        elevation={elevation}
                        wireframe={wireframe}
                        color={color}
                        depthColor={depthColor}
                        uColorOffset={uColorOffset}
                        uColorMultiplier={uColorMultiplier}
                        uFrequencyX={uFrequencyX}
                        uFrequencyY={uFrequencyY}
                        uBigWavesElevation={uBigWavesElevation}
                        uBigWavesSpeed={uBigWavesSpeed}
                    />
                </CanvasLayout>
            </Layout>
        </>
    );
}
