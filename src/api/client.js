import axios from 'axios'

export default class apiClient {
  static async getRedeemableMenuItems(storeNumber) {
    try {
      const items = await axios.get(
        import.meta.env.VITE_APP_API_URL + '/getRedeemableMenuItems?storeNumber=' + storeNumber
      )
      return items
    } catch (e) {
      console.error('error getting redeemable menu items')
      throw e
    }
  }

  static async getLocations(zip) {
    try {
      const stores = await axios.get(import.meta.env.VITE_APP_API_URL + '/locations?zip=' + zip)
      return stores
    } catch (e) {
      console.error('error getting stores')
      throw e
    }
  }
}
