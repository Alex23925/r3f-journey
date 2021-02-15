import create from 'zustand'
import {State} from 'zustand'

interface LinkState extends State{
  // links: []
  numLinks: number
  increaseLinks: () => void
  // increaseLinkArray: (num : number) => void
}


const useStore = create<LinkState>((set) => ({
  links: [],
  // established 11 links before implementing zustand thats why 11 is starter num
  numLinks: 11,
  increaseLinks: () => set(state => ({numLinks: state.numLinks + 1})),
  // increaseLinkArray: (num) => set(state => ({links: state.links.push(num)}))
}))

export default useStore