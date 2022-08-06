import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class rtValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new UnauthorizedException('Access denied');
    }

    return value;
  }
}
