import Layout from "../components/Layout";
import CanvasLayout from "../components/CanvasLayout";
import React, { useState } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import SceneTwentyEight from "../components/ch4-scenes/SceneTwentyEight";

export default function debugUI10() {
    const { elevation, wireframe, color, hoverColor } = useControls({
        elevation: {
            value: 0,
            min: -3,
            max: 3,
            step: 0.01,
        },
        wireframe: {
            value: false,
        },
        color: "#ff6030",
        hoverColor: "#1b3984",
    });

    return (
        <>
            <Layout
                lessonName=".28 Modified Materials"
                lessonLink="/28-modified-materials"
                lessonNum={28}
                chNum={4}
            >
                <CanvasLayout cameraPosition={new THREE.Vector3(5, 1, -5)}>
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
