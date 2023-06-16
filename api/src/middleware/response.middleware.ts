import { Response } from 'express';

function responseMiddleware(res: Response, status: number, data: object) {
  return res.status(status).send({ data: data });
}

export default responseMiddleware;
