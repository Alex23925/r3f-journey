import create from 'zustand'

const useStore = create((set) => {
  return {
    router: {},
    events: null,
    setEvents: (events : any) => {
      set({ events })
    },
  }
})

export default useStore