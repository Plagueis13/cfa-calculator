export async function getRedeemableMenuItems() {
  return await fetch('http://localhost:3000/getRedeemableMenuItems');
}
