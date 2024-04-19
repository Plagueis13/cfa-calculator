import express from 'express'
import { getRedeemableMenuItems, getLocations } from './cfaClient.js'
import cors from 'cors'
import errorHandler from './middleware/errorHandler.js'
import asyncHandler from 'express-async-handler'
const app = express()
const port = 3000
app.use(cors())
app.use(errorHandler)

app.get(
  '/locations',
  asyncHandler(async (req, res) => {
    res.send(await getLocations(req.query.zip))
  })
)

app.get(
  '/getRedeemableMenuItems',
  asyncHandler(async (req, res) => {
    res.send(await getRedeemableMenuItems(req.query.storeNumber))
  })
)

app.use(errorHandler)

app.listen(port, () => {
  console.log('listening')
})
