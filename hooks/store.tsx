import create from 'zustand'
import {State} from 'zustand'
import * as THREE from 'three'

interface LinkState extends State{
  links: string[]
  numLinks: number
  increaseLinks: () => void
}


const useStore = create<LinkState>((set) => ({
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
}))

export default useStore