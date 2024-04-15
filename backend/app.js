import express from 'express';
import {
  getRedeemableMenuItems,
  getMenuItems,
  getRedeemableItems,
  getToken,
} from './cfaClient.js';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors());

app.get('/getRedeemableMenuItems', async (req, res) => {
  res.send(await getRedeemableMenuItems());
});

app.get('/getToken', async (req, res) => {
  res.send(await getToken());
});

app.get('/getMenuItems', async (req, res) => {
  res.send(await getMenuItems());
});

app.get('/getRewards', async (req, res) => {
  res.send(await getRedeemableItems());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
