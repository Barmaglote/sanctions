import express from 'express'
import { authenticateToken } from './authentication.js'
import { GetPublic, GetPrivate, Update, Create } from '../../controllers/profiles.js'

const router = express.Router()

router.get('/public', GetPublic)
router.get('/private', authenticateToken, GetPrivate)
router.put('/', authenticateToken, Update)
router.post('/', authenticateToken, Create)

export function getRoutesAPIProfiles () {
    return router
}
