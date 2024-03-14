import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
var httpContext = require('express-http-context');
@Injectable()
export class TraceIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (!req.headers['x-request-id']) {
      const requestId = uuidv4();
      req.headers['x-request-id'] = requestId;
      httpContext.set('requestId', requestId);
    } else {
      httpContext.set('requestId', req.headers['x-request-id']);
    }
    next();
  }
}
