import { ApolloContext } from '../models/apollo-context'
import jwt from 'jsonwebtoken'

const EMPTY_CONTEXT = {
    isAuthenticated: false,
    user: null
}

export async function GetContext({ req, res }): Promise<ApolloContext> {
    const authHeader = req.headers.authorization?.split(' ')[1]
    const token = authHeader && authHeader.trim()

    if (!token) return EMPTY_CONTEXT;

    return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return reject(EMPTY_CONTEXT)
      resolve({
        isAuthenticated: user !== null,
        user: user
      })
    })
  })
}