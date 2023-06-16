import { cleanEnv, str, port } from 'envalid';

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
  });
}

export default validateEnv;
