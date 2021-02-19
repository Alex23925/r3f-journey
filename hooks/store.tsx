import create from 'zustand'
import {State} from 'zustand'
import * as THREE from 'three'
import { Mesh } from 'three'
import { ReactNode } from 'react'

interface LinkState extends State{
  radius: number,
  boxSize: number,
  spheres: ReactNode[]
  createSpheres: (sphere : ReactNode) => void
  setRadius: () => void
  setBoxSize: () => void
}


const useStore = create<LinkState>((set, get) => ({
  radius: Math.random() * .5,
  boxSize: 1,
  spheres: [],
  createSpheres: (sphere) => set(state => ({spheres: [...state.spheres, sphere]})),
  setRadius: () => set({radius: Math.random() * .5}),
  setBoxSize: () => set({boxSize: Math.random() * .5})
}))

export default useStore