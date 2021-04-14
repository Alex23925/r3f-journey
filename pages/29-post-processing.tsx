import Layout from "../components/Layout";
import CanvasLayout from "../components/CanvasLayout";
import { useThree } from "react-three-fiber";
import React, { useState } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import SceneTwentyNine from "../components/ch5-scenes/SceneTwentyNine";
import PostProcess from "../components/post-processing/PostProcess";

export default function postProcessing29() {
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
                lessonName=".29 Post Processing"
                lessonLink="/29-post-processing"
                lessonNum={29}
                chNum={5}
            >
                <CanvasLayout cameraPosition={new THREE.Vector3(2, 1, -2)}>
                    <SceneTwentyNine
                        elevation={elevation}
                        wireframe={wireframe}
                        color={color}
                        hoverColor={hoverColor}
                    />
                    <PostProcess />
                </CanvasLayout>
            </Layout>
        </>
    );
}
