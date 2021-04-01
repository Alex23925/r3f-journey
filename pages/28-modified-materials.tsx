import Layout from "../components/Layout";
import CanvasLayout from "../components/CanvasLayout";
import React, { useState } from "react";
import * as THREE from "three";
import { useControls } from "leva";
// NOTE
// DatGUI missing styling so have to import it
// If using scss go to that file path and change the css extension to scss
import "react-dat-gui/dist/index.scss";
import SceneTwentyEight from "../components/ch4-scenes/SceneTwentyEight";

export default function debugUI10() {
    const { elevation } = useControls({
        elevation: {
            value: 0,
            min: -3,
            max: 3,
            step: 0.01,
        },
    });
    const { visible } = useControls({
        visible: {
            value: true,
        },
    });
    const { wireframe } = useControls({
        wireframe: {
            value: false,
        },
    });
    const { color } = useControls({ color: "#ff6030" });
    const { hoverColor } = useControls({ hoverColor: "#1b3984" });

    return (
        <>
            <Layout
                lessonName=".28 Modified Materials"
                lessonLink="/28-modified-materials"
                lessonNum={28}
                chNum={4}
            >
                <CanvasLayout cameraPosition={new THREE.Vector3(3, 3, 3)}>
                    <SceneTwentyEight
                        elevation={elevation}
                        wireframe={wireframe}
                        color={color}
                        hoverColor={hoverColor}
                    />
                </CanvasLayout>
            </Layout>
        </>
    );
}
