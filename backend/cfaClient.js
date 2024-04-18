import { chromium } from '@playwright/test'

export async function getToken() {
  // Playwright test
  // Launch the browser
  const browser = await chromium.launch()

  // Create a new page
  const page = await browser.newPage()

  // Navigate to the Express server
  await page.goto('https://order.chick-fil-a.com')
  await page.waitForURL('https://order.chick-fil-a.com/get-started')

  const storageState = await page.context().storageState()
  const persistAuth = storageState.origins[0].localStorage.filter(
    (object) => object.name === 'persist:auth'
  )
  const bearer = JSON.parse(JSON.parse(persistAuth[0].value).session).accessToken

  // Close the browser
  await browser.close()

  return bearer
}

export async function getRedeemableItems() {
  const bearer = await getToken()
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${bearer}`)
  headers.append('Content-type', 'application/json')
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({})
  }
  const response = await fetch(
    'https://commerce.api.my.chick-fil-a.com/cfa.d2c.frontend.loyalty.v1.LoyaltyService/GetRewardsContent',
    requestOptions
  )
  if (!response.ok) {
    console.error(response.status)
  } else {
    return (await response.json()).menu.redeemableItems
  }
}

export async function getMenuItems(storeNumber = '01156') {
  const response = await fetch(
    'https://order.api.my.chick-fil-a.com/orders/locations/3.2/' +
      storeNumber +
      '/menu/client/individual'
  )
  if (!response.ok) {
    throw new Error('Failed to fetch menu items')
  }
  const flattenedItems = (await response.json()).itemGroups.flatMap((itemGroup) => itemGroup.items)
  const filteredItems = flattenedItems.filter((item) => item.isSellable === true)
  return filteredItems
}

export async function getLocations(zipCode) {
  const response = await fetch(
    `https://liveapi.yext.com/v2/accounts/me/entities/geosearch?api_key=23469f663d79c395602fba3788145555&entityTypes=restaurant&fields=c_locationName&limit=25&location=${zipCode}&radius=200&v=20200401`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch stores')
  }
  const stores = (await response.json()).response.entities.map((entity) => ({
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
