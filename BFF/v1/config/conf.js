import dotenv from 'dotenv'

dotenv.config();

const config={
    port: process.env.PORT || 3000,
    baseUrl: 'http://localhost:8080/api/v1',
}

export default config