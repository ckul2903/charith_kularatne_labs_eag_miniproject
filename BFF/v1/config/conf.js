import dotenv from 'dotenv'

dotenv.config();

const config={
    port: process.env.PORT || 3000,
    bffUrlPrefix:process.env.BFF_URL || '/api/v1',
    baseUrlPrefix: process.env.BASE_URL || 'http://localhost:8080/api/v1',
    awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
}

export default config;