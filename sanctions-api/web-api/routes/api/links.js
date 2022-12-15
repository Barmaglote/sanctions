import express from 'express'
import { Links } from '../../controllers/links.js'
const router = express.Router()

router.get('/', Links)

export function getRoutesAPILinks () {
    return router
}
