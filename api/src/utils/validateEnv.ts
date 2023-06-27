import { cleanEnv, str, port, num } from 'envalid';

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    PORT: port({ default: 4000 }),
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_DB_URI: str(),
    MONGO_DATABASE: str(),
    JWT_SECRET: str(),
    BASE_LOG_FOLDER: str(),
    ERROR_LOG: str(),
    COMBINED_LOG: str(),
    DEFAULT_LIMIT: num(),
    DEFAULT_OFFSET: num(),
    BCRYPT_SALT: num(),
  });
}

export default validateEnv;
