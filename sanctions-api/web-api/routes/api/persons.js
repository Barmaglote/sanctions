import express from 'express'
import { Persons } from '../../controllers/persons.js'
const router = express.Router()

router.get('/', Persons)

export function getRoutesAPIPersons () {
    return router
}
