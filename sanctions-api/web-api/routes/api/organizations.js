import express from 'express'
import { Organizations } from '../../controllers/organizations.js'
const router = express.Router()

router.get('/', Organizations)

export function getRoutesAPIOrganizations () {
    return router
}
