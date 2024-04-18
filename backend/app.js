import express from 'express'
import {
  getRedeemableMenuItems,
  getMenuItems,
  getRedeemableItems,
  getToken,
  getLocations
} from './cfaClient.js'
import cors from 'cors'
const app = express()
const port = 3000
app.use(cors())

app.get('/locations', async (req, res) => {
  res.send(await getLocations(req.query.zip))
})

app.get('/getRedeemableMenuItems', async (req, res) => {
  res.send(await getRedeemableMenuItems(req.query.storeNumber))
})

app.get('/getToken', async (req, res) => {
  res.send(await getToken())
})

app.get('/getMenuItems', async (req, res) => {
  res.send(await getMenuItems())
})

app.get('/getRewards', async (req, res) => {
  res.send(await getRedeemableItems())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
