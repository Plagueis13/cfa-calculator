import { getRedeemableMenuItems } from './apiClient';

const item = document.getElementById('item'),
  price = document.getElementById('price'),
  reward = document.getElementById('reward'),
  pointsPer = document.getElementById('pointsPer'),
  table = document.getElementById('cfaTable'),
  filter = document.getElementById('filterMenu');

export function addListeners() {
  item.addEventListener('click', function () {
    sortTable(0);
  });
  price.addEventListener('click', function () {
    sortTable(1);
  });
  reward.addEventListener('click', function () {
    sortTable(2);
  });
  pointsPer.addEventListener('click', function () {
    sortTable(3);
  });
}

filter.addEventListener('click', (e) => {
  filterType(e);
});

export async function fillTable() {
  const response = await getRedeemableMenuItems();
  const menuItems = await response.json();
  menuItems.forEach((item) => {
    let tr = document.createElement('TR');
    tr.innerHTML = `
      <td class="align-middle">${item.name}</td>
      <td class="align-middle">${item.price.toFixed(2)}</td>
      <td class="align-middle">${item.points}</td>
      <td class="align-middle">${(item.points / item.price).toFixed(2)}</td>`;
    table.appendChild(tr);
  });
}

function sortTable(n) {
  console.log(n);
  const rows = Array.from(table.getElementsByTagName('tr'));

  rows.sort((a, b) => {
    let aValue, bValue;
    if (n === 0) {
      aValue = a.cells[n].innerText.trim();
      bValue = b.cells[n].innerText.trim();
    } else {
      aValue = parseFloat(a.cells[n].innerText.trim());
      bValue = parseFloat(b.cells[n].innerText.trim());
    }
    return aValue - bValue;
  });
  console.log(rows);

  // Clear existing table rows
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  // Re-append sorted rows to the tbody
  rows.forEach((row) => {
    table.appendChild(row);
  });
}
