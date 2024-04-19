import json from './RewardsContent.json' assert { type: 'json' }
import axios from 'axios'

export async function getRedeemableItems() {
  return json.redeemableItems
}

export async function getMenuItems(storeNumber = '01156') {
  let response
  response = await axios.get(
    'https://order.api.my.chick-fil-a.com/orders/locations/3.2/' +
      storeNumber +
      '/menu/client/individual'
  )
  const flattenedItems = response.data.itemGroups.flatMap((itemGroup) => itemGroup.items)
  const filteredItems = flattenedItems.filter((item) => item.isSellable === true)
  return filteredItems
}

export async function getLocations(zipCode) {
  const response = await axios.get(
    `https://liveapi.yext.com/v2/accounts/me/entities/geosearch?api_key=23469f663d79c395602fba3788145555&entityTypes=restaurant&fields=c_locationName&limit=25&location=${zipCode}&radius=200&v=20200401`
  )
  const stores = response.data.response.entities.map((entity) => ({
    name: entity.c_locationName,
    storeNumber: entity.meta.id
  }))
  return stores
}

export async function getRedeemableMenuItems(storeNumber) {
  const menuItems = await getMenuItems(storeNumber)
  const redeemableItems = await getRedeemableItems()
  const menuItemMap = new Map(menuItems.map((item) => [item.tag, item]))
  const redeemableMenuItems = []
  redeemableItems.forEach((redeemableItem) => {
    redeemableItem.applicableItemTags.forEach((applicableTag) => {
      if (menuItemMap.has(applicableTag)) {
        redeemableMenuItems.push({
          name: menuItemMap.get(applicableTag).name,
          price: menuItemMap.get(applicableTag).itemPrice,
          points: redeemableItem.points
        })
      }
    })
  })

  return redeemableMenuItems
}
