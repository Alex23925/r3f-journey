import create from 'zustand'
import {State} from 'zustand'
import * as THREE from 'three'

import px from '../static/textures/environmentMaps/0/px.png'
import nx from '../static/textures/environmentMaps/0/nx.png'
import py from '../static/textures/environmentMaps/0/py.png'
import ny from '../static/textures/environmentMaps/0/ny.png'
import pz from '../static/textures/environmentMaps/0/pz.png'
import nz from '../static/textures/environmentMaps/0/nz.png'

interface LinkState extends State{
  images: string[]
  links: string[]
  numLinks: number
  increaseLinks: () => void
}


const useStore = create<LinkState>((set) => ({
  images: [
    px,
    nx,
    py,
    ny,
    pz,
    nz
  ],
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