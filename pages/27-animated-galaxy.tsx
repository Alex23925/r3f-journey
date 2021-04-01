import Layout from "../components/Layout";
import CanvasLayout from "../components/CanvasLayout";
import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { useControls } from "leva";
// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import "react-dat-gui/dist/index.scss";
import useStore from "../hooks/store";
import SceneTwentySeven from "../components/ch4-scenes/SceneTwentySeven";

export default function galaxy18() {
    // LEVA
    const { insideColor } = useControls({ insideColor: "#ff6030" });
    const { outsideColor } = useControls({ outsideColor: "#1b3984" });
    const { numParticles } = useControls({
        numParticles: {
            value: 200000,
            min: 0,
            max: 250000,
            step: 1,
        },
    });
    const { size } = useControls({
        size: {
            value: 8,
            min: 0,
            max: 16,
            step: 0.0001,
        },
    });
    const { radius } = useControls({
        radius: {
            value: 5,
            min: 0,
            max: 10,
            step: 0.01,
        },
    });
    const { branches } = useControls({
        branches: {
            value: 3,
            min: 0,
            max: 20,
            step: 0.01,
        },
    });
    const { spin } = useControls({
        spin: {
            value: 1,
            min: 10,
            max: 1,
            step: 0.01,
        },
    });
    const { randomness } = useControls({
        randomness: {
            value: 0.5,
            min: 0,
            max: 5,
            step: 0.01,
        },
    });
    const { randomnessPower } = useControls({
        randomnessPower: {
            value: 3,
            min: 0,
            max: 5,
            step: 0.01,
        },
    });

    return (
        <>
            <Layout
                lessonName="27. Animated Galaxy"
                lessonLink="/27-animated-galaxy"
                lessonNum={27}
                chNum={2}
            >
                <CanvasLayout cameraPosition={new THREE.Vector3(3, 3, 3)}>
                    <SceneTwentySeven
                        size={size}
                        count={numParticles}
                        radius={radius}
                        branches={branches}
                        spin={spin}
                        randomness={randomness}
                        randomnessPower={randomnessPower}
                        insideColor={insideColor}
                        outsideColor={outsideColor}
                    />
                </CanvasLayout>
            </Layout>
        </>
    );
}
