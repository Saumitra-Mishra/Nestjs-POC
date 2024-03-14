import { transports, createLogger as winstonCreateLogger } from 'winston';
var httpContext = require('express-http-context');

const configuration = {
  transports: [new transports.Console()],
};

export function createLogger() {
  return winstonCreateLogger(configuration);
}

const winstonLogger = createLogger();

const logger = {
  info: (message: string) => {
    winstonLogger.info({
      message,
      ...getMetaData(),
      timeStamp: new Date(),
    });
  },
  error: (message) => {
    winstonLogger.error({
      message,
      ...getMetaData(),
      timeStamp: new Date(),
    });
  },
  verbose: (message) => {
    winstonLogger.info(message);
  },
};


const getMetaData = () => {
  return {
    request_id: httpContext.get('requestId'),
  };
};

export { winstonLogger as logger, logger as customLogger };
