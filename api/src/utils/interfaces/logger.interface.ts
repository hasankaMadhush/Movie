import { Application } from 'express';

interface LoggerInterface {
  logger: any;
  initiateLogger(): void;
  log(level: string, message: string): void;
  logRequests(app: Application): void;
}

export default LoggerInterface;
