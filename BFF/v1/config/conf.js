import dotenv from 'dotenv';

dotenv.config();

const config={
    port: process.env.PORT || 3000,
    bffUrlPrefix:process.env.BFF_URL || '/api/v1',
    baseUrlPrefix: process.env.BASE_URL || 'http://localhost:8080/api/v1',
    awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsSessionToken: process.env.AWS_SESSION_TOKEN,
    awsRegion: process.env.AWS_REGION || 'us-east-1',
    userPoolId: process.env.USER_POOL_ID,
    clientId: process.env.CLIENT_ID,
}

export default config;