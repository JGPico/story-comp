import express, { type Request, type Response } from 'express';
const router = express.Router()

router.get('/', (_req: Request, res: Response) => {
    res.status(200).json({ "users lists": "goes here" })
})

router.get('/new', (_req: Request, res: Response) => {
    res.status(200).json({ "new user": "info here" })
})

router.post("/", (_req: Request, res: Response) => {
    res.status(200).json({ "create user": "here" })
})

// put static routes above dynamic routes (routes that use the colon sign : to get stuff from the url)

router.route("/:id")
    .get((req: Request, res: Response) => {
        const myid = req.params.id
        res.status(200).json({ "user": `Get user with ID ${myid}` })
    })
    .put((req: Request, res: Response) => {
        const myid = req.params.id
        res.status(200).json({ "user": `Update user with ID ${myid}` })
    })
    .delete((req: Request, res: Response) => {
        const myid = req.params.id
        res.status(200).json({ "user": `Delete user with ID ${myid}` })
    })

export default router;