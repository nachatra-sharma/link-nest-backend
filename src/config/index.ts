import dotenv from 'dotenv'
dotenv.config()

export const DB_URL = process.env.DB_URL
export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET || 'JWTS4CR4T'
