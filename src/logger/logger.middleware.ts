import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { url, query, body } = req;
    const { statusCode } = res;
    const bodyStringify = JSON.stringify(body);
    const queryStringify = JSON.stringify(query);
    console.log(
      `URL: ${url}, Status code: ${statusCode}, Body: ${bodyStringify}, Query params: ${queryStringify}`,
    );

    next();
  }
}
