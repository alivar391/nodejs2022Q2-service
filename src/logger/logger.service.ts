import { LoggerService } from '@nestjs/common';

import 'dotenv/config';

export class MyLoggerService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log('\x1b[37m', optionalParams, '\x1b[32m', message);
  }

  error(message: any, ...optionalParams: any[]) {
    console.log('\x1b[31m', optionalParams, message);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log('\x1b[33m', optionalParams, message);
  }

  debug(message: any, ...optionalParams: any[]) {
    console.log('\x1b[34m', optionalParams, message);
  }

  verbose(message: any) {
    console.log('\x1b[36m', message);
  }
}
