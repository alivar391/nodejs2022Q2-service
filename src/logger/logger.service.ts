import { LoggerService } from '@nestjs/common';

import 'dotenv/config';

export class MyLoggerService implements LoggerService {
  log(message: any) {
    console.log(message);
  }

  error(message: any) {
    console.log(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }

  verbose(message: any) {
    console.log(message);
  }
}
