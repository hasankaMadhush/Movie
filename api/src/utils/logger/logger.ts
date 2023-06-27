import { Application, NextFunction, Response, Request } from 'express';
import winston, { format } from 'winston';

import LoggerInterface from 'utils/interfaces/logger.interface';

const { combine, timestamp, prettyPrint } = format;
const PRODUCTION = 'production';
const INFO = 'info';
const { BASE_LOG_FOLDER, ERROR_LOG, COMBINED_LOG } = process.env;

class Logger implements LoggerInterface {
  public logger: any = null;

  constructor() {
    this.initiateLogger();
  }

  public initiateLogger(): void {
    if (!this.logger) {
      this.logger = winston.createLogger({
        format: combine(timestamp(), prettyPrint()),
        level: INFO,
        transports: [
          // - Write all logs with importance level of `error` or less to `error.log`
          // - Write all logs with importance level of `info` or less to `combined.log`
          new winston.transports.File({
            filename: `${BASE_LOG_FOLDER}${ERROR_LOG}`,
            level: 'error',
          }),
          new winston.transports.File({ filename: `${BASE_LOG_FOLDER}${COMBINED_LOG}` }),
        ],
      });
    }
    if (process.env.NODE_ENV !== PRODUCTION) {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        })
      );
    }
  }

  public log(level: string, message: string): void {
    this.logger.log({ level, message });
  }

  // logs all requests to logger
  public logRequests(app: Application): void {
    app.use((req: Request, res: Response, next: NextFunction) => {
      this.logger.info({
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        reqeustTime: Date.now(),
      });
      next();
    });
  }
}

export default Logger;
