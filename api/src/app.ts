import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

import ErrorMiddleware from 'middleware/error.middleware';
import MongoDB from 'utils/mongo.db';
import RouterInterace from 'utils/interfaces/router.interface';

class App extends MongoDB {
  public express: Application;
  public port: number;

  constructor(routers: RouterInterace[], port: number) {
    super();
    this.express = express();
    this.port = port;

    this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseRoutes(routers);
    this.initialiseErrorHandling();
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(morgan('dev'));
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(compression());
  }

  private initialiseRoutes(routers: RouterInterace[]): void {
    routers.forEach((router: RouterInterace) => this.express.use('/api', router.router));
  }

  private initialiseErrorHandling() {
    this.express.use(ErrorMiddleware);
  }

  private initialiseDatabaseConnection(): void {
    this.connect();
  }

  public listen(): void {
    this.express.listen(this.port, () => console.log(`App listening on port ${this.port} 🔥🔥🔥`));
  }
}

export default App;
