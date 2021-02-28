import create from 'zustand'
import {State} from 'zustand'
import { ReactNode } from 'react'
import { Camera, PerspectiveCamera, Vector3 } from 'three'
import * as THREE from 'three'

interface  LinkState extends State {
    camera: Camera | null
    burgerPosition: Vector3
    currentCamera: Camera | null
    hovered: boolean

    setHovered: () => void
    setCamera: (cam : Camera) => void
    setCurrentCamera: (cam : Camera)  => void
}

const useAsteroidStore = create<LinkState>((set, get) => ({
    burgerPosition: new Vector3(0, 0, 0),
    camera: null,
    currentCamera: null,
    hovered: false,

    setHovered: () => set(state => ({hovered: state.hovered === false ? true : false})),
    setCamera: (cam) =>  set(state => ({camera: cam})),
    setCurrentCamera: (cam) =>  set(state => ({camera: cam})),
}))

export default useAsteroidStore