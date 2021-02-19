import create from 'zustand'
import {State} from 'zustand'
import * as THREE from 'three'
import { Mesh } from 'three'
import { ReactNode } from 'react'

interface LinkState extends State{
  radius: number,
  boxSize: number,
  spheres: ReactNode[]
  spheresCopy: ReactNode[]
  createSphere: (sphere : ReactNode) => void
  deleteSphere: () => void
  setRadius: () => void
  setBoxSize: () => void
  setSpheresCopy: () => void
}


const useStore = create<LinkState>((set, get) => ({
  radius: Math.random() * .5,
  boxSize: 1,
  spheres: [],
  spheresCopy: [],
  createSphere: (sphere) => set(state => ({spheres: [...state.spheres, sphere]})),
  deleteSphere: () => set(state => ({spheres: state.spheresCopy})), 
  setRadius: () => set({radius: Math.random() * .5}),
  setBoxSize: () => set({boxSize: Math.random() * .5}),
  setSpheresCopy: () => set(state => ({spheresCopy: state.spheres.splice(0, state.spheres.length-1)}))
}))

export default useStore