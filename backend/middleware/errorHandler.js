const errorHandler = (err, req, res, next) => {
  // Handle the error here
  console.error(err.stack)
  res.status(err.response.status === 200 ? 500 : err.response.status)

  // Send the error message as the response
  res.json({ error: err.message })
  next()
}

export default errorHandler
