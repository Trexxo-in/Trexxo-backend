import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/ping', (req: Request, res: Response) => {
    res.status(200).json({
        message:"Socket is running"
    })
})
export default router