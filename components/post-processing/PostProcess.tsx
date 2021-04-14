import React, { useMemo, useEffect } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

export default function PostProcess() {
    const { gl, scene, camera, size } = useThree();

    // Render Target
    let RenderTargetClass: any = null;

    if (gl.getPixelRatio() === 1 && gl.capabilities.isWebGL2) {
        RenderTargetClass = THREE.WebGLMultisampleRenderTarget;
    } else {
        RenderTargetClass = THREE.WebGLRenderTarget;
    }

    const renderTarget = useMemo(
        () =>
            new RenderTargetClass(800, 600, {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                encoding: THREE.sRGBEncoding,
            }),
        []
    );

    // Post Processing
    const effectComposer = useMemo(
        () => new EffectComposer(gl, renderTarget),
        []
    );
    effectComposer.setPixelRatio(gl.getPixelRatio());
    effectComposer.setSize(size.width, size.height);

    const renderPass = useMemo(() => new RenderPass(scene, camera), []);
    effectComposer.addPass(renderPass);

    const dotScreenPass = useMemo(() => new DotScreenPass(), []);
    dotScreenPass.enabled = false;
    effectComposer.addPass(dotScreenPass);

    const glitchPass = useMemo(() => new GlitchPass(), []);
    glitchPass.enabled = false;
    effectComposer.addPass(glitchPass);

    const rgbShiftPass = useMemo(() => new ShaderPass(RGBShiftShader), []);
    rgbShiftPass.enabled = false;
    effectComposer.addPass(rgbShiftPass);

    const unrealBloomPass = useMemo(() => new UnrealBloomPass(), []);
    unrealBloomPass.strength = 0.3;
    unrealBloomPass.radius = 1;
    unrealBloomPass.threshold = .6;
    effectComposer.addPass(unrealBloomPass);
    
    if (gl.getPixelRatio() === 1 && !gl.capabilities.isWebGL2) { 
        const smaaPass = useMemo(
            () => new SMAAPass(size.width, size.height),
            []
        );
        effectComposer.addPass(smaaPass);
    }

    useEffect(() => {
        effectComposer.setSize(size.width, size.height);
    }, [effectComposer, size]);

    useFrame(() => {
        effectComposer.render();
    }, 1);

    return null;
}
