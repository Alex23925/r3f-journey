import create from 'zustand'
import {State} from 'zustand'
import * as THREE from 'three'
import { Mesh } from 'three'
import { ReactNode } from 'react'

interface LinkState extends State{
  spheres: ReactNode[]
  numSpheres: number
  links: string[]
  numLinks: number
  increaseLinks: () => void
  increaseSpheres: (sphere : ReactNode) => void
}


const useStore = create<LinkState>((set, get) => ({
  spheres: [],
  numSpheres: 0,
  links: [
          '/00-playground',
          '/',
          '/geometries-09',
          '/10-debugUI',
          '/11-texture',
          '/12-materials',
          '/13-text',
          '/14-lights',
          '/15-shadows',
          '/16-haunted-house',
          '/17-particles',
          '/18-galaxy', 
         ],
  // established 11 links before implementing zustand thats why 11 is starter num
  numLinks: 11,
  increaseLinks: () => set(state => ({numLinks: state.numLinks + 1})),
  increaseSpheres: (sphere) => set(state => ({spheres: [...state.spheres, sphere]})),
}))

export default useStore