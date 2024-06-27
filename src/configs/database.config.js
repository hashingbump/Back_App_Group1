import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
export const DATABASE_CONFIG = {
  MONGO_DATABASE: process.env.MONGODB_URI | undefined
}
