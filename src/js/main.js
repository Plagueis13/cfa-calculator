// Import our custom CSS
import '../scss/styles.scss';
import { fillTable, addListeners } from './app';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

async function display() {
  try {
    addListeners();
    await fillTable();
  } catch (e) {
    console.error('error displaying');
  }
}

display();
