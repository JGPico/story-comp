import express, { type NextFunction, type Express, type Request, type Response } from 'express';
import userRouter from "./routes/users.js"

const app: Express = express();
const port = Number(process.env.PORT) || 5432

app.use(express.json())
app.use(logger)

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

// TODO: Add middleware to log requests
// TODO: Add middleware to add CORS headers
// TODO: Add middleware to add security headers
// TODO: Add middleware to add rate limiting
// TODO: Add middleware to add error handling
// TODO: Add middleware to add logging
// TODO: Add middleware to add monitoring
// TODO: Add middleware to add security

// TODO: Add deployment

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    Hello: "You have reached the api for story comp"
  })
})

app.post("/lemon/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { bod } = req.body;

  if (!bod) {
    res.status(418).json({ message: "Failed to post. Body of message required" })
  }

  res.status(202).json({
    success: `Your ${bod} was received with id ${id}`
  })
})

app.use("/users", userRouter)

function logger(req: Request, _res: Response, next: NextFunction) {
  console.log(req.originalUrl)
  next()
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
