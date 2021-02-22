import React, { Suspense, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import CameraControls from '../CameraControls'
import modelUrl from '../../static/models/FlightHelmet/glTF/FlightHelmet.gltf'
import '../../static/models/FlightHelmet/glTF/FlightHelmet.bin'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_GlassPlasticMat_BaseColor.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_GlassPlasticMat_Normal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_GlassPlasticMat_OcclusionRoughMetal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LeatherPartsMat_BaseColor.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LeatherPartsMat_Normal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LeatherPartsMat_OcclusionRoughMetal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LensesMat_BaseColor.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LensesMat_Normal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LensesMat_Normal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_LensesMat_OcclusionRoughMetal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_MetalPartsMat_BaseColor.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_MetalPartsMat_Normal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_MetalPartsMat_OcclusionRoughMetal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_RubberWoodMat_BaseColor.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_RubberWoodMat_Normal.png'
import '../../static/models/FlightHelmet/glTF/FlightHelmet_Materials_RubberWoodMat_OcclusionRoughMetal.png'

import foxUrl from '../../static/models/Fox/glTF/Fox.gltf'
import '../../static/models/Fox/glTF/Fox.bin'
import '../../static/models/Fox/glTF/Texture.png'

interface SceneProps {
    elevation: number,
    color: string,
    hoverColor:string,
    wireframe: boolean
}

interface BoxProps {
    elevation: number,
    color: string,
    hoverColor: string,
    wireframe: boolean
}

interface AssetProps {
    url: any
}


const Floor = () => {
    return (
        <mesh rotation-x={-Math.PI * 0.5} receiveShadow={true}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial
                color={'#444444'}
                metalness={0}
                roughness={0.5}
            />
        </mesh>
    )
}

const Lights = () => {
    return (
        <group>
            <ambientLight args={[0xffffff, 0.8]} />
            <directionalLight
                castShadow={true}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={15}
                shadow-camera-left={-7}
                shadow-camera-top={7}
                shadow-camera-bottom={-7}
                position={[5, 5, 5]}
                args={[0xffffff, 0.6]}
            />
        </group>
    )
}

const Asset = (props: AssetProps) => {
    const {scene, nodes, materials, animations} = useGLTF(props.url)
    const {ref, mixer, names, actions, clips} = useAnimations(animations)
    console.log(nodes)
    useEffect(() => {
        actions[names[2]].play()
    }, [actions, names])
    return (
            <group ref={ref}>
                <primitive scale={[0.025, 0.025, 0.025]} object={scene} />
            </group>
        )
}

export default function SceneTwentyOne(props: SceneProps) {
    return (
        <> 
            <Suspense fallback={null}>
                <Asset url={foxUrl} />
            </Suspense>
            <Floor />
            <Lights />
            <CameraControls />
        </>
    )
}