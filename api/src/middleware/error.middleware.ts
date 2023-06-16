import { Request, Response, NextFunction } from 'express';
import HttpException from 'utils/exceptions/http.exception';
import { HttpStatus } from 'utils/enums/http.status.enums';

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = error.status || HttpStatus.Internal_Error;
  const message = error.message || 'Something went wrong.';

  res.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
