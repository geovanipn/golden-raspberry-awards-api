import * as process from 'process';

export default {
    environment: process.env.ENVIRONMENT ?? 'development',
    port: process.env.PORT ?? 3000,
};
