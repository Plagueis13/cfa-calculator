export async function getMenuItems() {
  const response = await fetch(
    'https://order.api.my.chick-fil-a.com/orders/locations/3.2/01156/menu/client/individual'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch menu items');
  }
  return response.json();
}

export function getEntrees(menuResponse) {
  const entrees = menuResponse.itemGroups.flatMap((itemGroup) =>
    itemGroup.items.filter(
      (item) =>
        (item.itemPrice !== 0 &&
          item.itemType === 'ENTREES' &&
          item.itemGroupType === 'Entree' &&
          item.isSellable === true) ||
        (item.itemPrice !== 0 &&
          item.itemType === 'SIDES' &&
          item.itemGroupType === 'Item' &&
          item.isSellable === true)
    )
  );
  return entrees;
}
