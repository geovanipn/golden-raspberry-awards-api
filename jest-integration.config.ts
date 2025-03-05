// @ts-nocheck
import config from './jest.config';
const currentPath = 'integration';

config.testMatch = [`<rootDir>tests/${currentPath}/**/*.test.ts`];

export default config;