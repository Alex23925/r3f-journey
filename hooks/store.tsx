import create from 'zustand'
import {State} from 'zustand'
import { ReactNode } from 'react'

interface LinkState extends State{
  randomNum: number,
  randomColor: string,
  colors: string[],
  radius: number,
  boxSize: number,
  spheres: ReactNode[]
  boxes: ReactNode[]
  numSpheres: number
  numBoxes: number
  spheresCopy: ReactNode[]
  boxesCopy: ReactNode[]

  createSphere: (sphere : ReactNode) => void
  deleteSphere: () => void
  increaseNumSpheres: () => void
  decreaseNumSpheres: () => void
  createBox: (sphere : ReactNode) => void
  deleteBox: () => void
  increaseNumBoxes: () => void
  decreaseNumBoxes: () => void
  setRandomColor: () => void
  setRandomNumber: () => void
  setRadius: () => void
  setBoxSize: () => void
  setSpheresCopy: () => void
  setBoxesCopy: () => void
}


const useStore = create<LinkState>((set, get) => ({
  randomNum: Math.random() * 5,
  randomColor: '',
  colors: ['blue', 'green', 'yellow', 'orange'],
  radius: Math.random() * .5,
  boxSize: 1,
  spheres: [],
  boxes: [],
  numSpheres: 0,
  numBoxes: 0,
  spheresCopy: [],
  boxesCopy: [],
  
  //Sphere Create/Delete Functions
  createSphere: (sphere) => set(state => ({spheres: [...state.spheres, sphere]})),
  deleteSphere: () => set(state => ({spheres: state.spheresCopy})), 
  increaseNumSpheres: () => set(state => ({numSpheres: state.numSpheres + 1})),
  decreaseNumSpheres: () => set(state => ({numSpheres: state.numSpheres - 1})),
  //Box Create/Delete Functions
  createBox: (box) => set(state => ({boxes: [...state.boxes, box]})),
  deleteBox: () => set(state => ({boxes: state.boxesCopy})), 
  increaseNumBoxes: () => set(state => ({numBoxes: state.numBoxes + 1})),
  setRandomColor: () => set(state => ({randomColor: state.colors[state.randomNum]})),
  decreaseNumBoxes: () => set(state => ({numBoxes: state.numBoxes - 1})),
  setRandomNumber: () => set({randomNum: Math.random() * 5}),
  setRadius: () => set({radius: Math.random() * .5}),
  setBoxSize: () => set({boxSize: Math.random() * .5}),
  setSpheresCopy: () => set(state => ({spheresCopy: state.spheres.splice(0, state.spheres.length-1)})),
  setBoxesCopy: () => set(state => ({boxesCopy: state.boxes.splice(0, state.boxes.length-1)}))
}))

export default useStore