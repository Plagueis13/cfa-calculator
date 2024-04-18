import { defineStore } from 'pinia'

export const useCfaLocation = defineStore({
  id: 'locationStore',
  state: () => ({
    storeNumber: ''
  }),
  getters: {
    selectedStoreNumber: (state) => state.storeNumber
  },
  actions: {
    setLocation(storeNumber) {
      this.storeNumber = storeNumber
    }
  }
})
