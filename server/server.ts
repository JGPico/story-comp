import express from 'express'

const app = express()
const port = Number(process.env.PORT) || 5432

// TODO Create a Dockerfile
// TODO Create a docker-compose.yml file
// TODO Create a .dockerignore file
// TODO Create a .dockerfile file

// TODO: Add routes
// TODO: Add error handling
// TODO: Add health check
// TODO: Add endpoints

// TODO: Add database
// TODO: Add authentication
// TODO: Add authorization
// TODO: Add logging
// TODO: Add monitoring
// TODO: Add security
// TODO: Add monitoring

// TODO: Add middleware to parse JSON bodies
// TODO: Add middleware to log requests
// TODO: Add middleware to add CORS headers
// TODO: Add middleware to add security headers
// TODO: Add middleware to add rate limiting
// TODO: Add middleware to add error handling
// TODO: Add middleware to add logging
// TODO: Add middleware to add monitoring
// TODO: Add middleware to add security

// TODO: Add deployment

app.get('/', (_req, res) => {
  res.send('You have reached the api for story comp')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
