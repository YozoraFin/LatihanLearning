import express from 'express'
import { User } from '../models/user.model.js'

const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const users = await User.findAll()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

export default router