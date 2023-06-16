import 'dotenv/config';
import 'module-alias/register';

import App from './app';
import validateEnv from 'utils/validateEnv';
import UserRouter from 'resources/user/user.router';

validateEnv(); // validates env variables

const app = new App([new UserRouter()], Number(process.env.PORT));

app.listen();
