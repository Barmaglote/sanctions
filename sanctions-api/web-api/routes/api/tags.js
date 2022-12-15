import express from 'express'
import { Tags } from '../../controllers/tags.js'

const router = express.Router()
router.get('/', Tags)

export function getRoutesAPITags () {
    return router
}
