import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error){
    throw new Error("Couldn't find .env file");
}

const config = {
    port: process.env.PORT || 8000,
    databaseURL: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,
    submit_jokes_service_url: process.env.SUBMIT_JOKES_SERVICE_URL,
    deliver_jokes_service_url: process.env.DELIVER_JOKES_SERVICE_URL,
    logs:{
        level: process.env.LOG_LEVEL || 'silly',
    },
    api:{
        prefix: '/api',
    }
}
export default config;