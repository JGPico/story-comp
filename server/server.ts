import express from 'express'

const app = express()
const port = Number(process.env.PORT) || 5432

app.get('/', (_req, res) => {
  res.send('You have reached the api for story comp')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
