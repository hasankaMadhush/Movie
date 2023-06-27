import { Request, Response, NextFunction } from 'express';
import HttpException from 'utils/exceptions/http.exception';
import { HttpStatus } from 'utils/enums/http.status.enums';
import Logger from 'utils/logger/logger';

const ERROR = 'error';

// logs all errors to logger file
function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = error.status || HttpStatus.Internal_Error;
  const message = error.message || 'Something went wrong.';
  const logger = new Logger();
  logger.log(ERROR, message);
  res.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
