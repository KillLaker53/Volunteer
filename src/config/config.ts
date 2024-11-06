export const DB = {
    HOST: process.env.MONGODB_HOST || 'localhost',
    PORT: process.env.MONGODB_PORT || '27017',
    NAME: process.env.MONGODB_DATABASE || '',
    USERNAME: process.env.MONGODB_USERNAME || '',
    PASSWORD: process.env.MONGODB_PASSWORD || '',   
    URI: process.env.MONGODB_URI || '',
}

export const PORT = process.env.PORT || 5000;