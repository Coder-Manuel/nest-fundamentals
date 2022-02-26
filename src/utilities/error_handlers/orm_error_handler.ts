import { BadRequestException, Logger } from '@nestjs/common';
import { PostgresErrorCode } from '.';

export default class ORMErrorHandler {
  static handle(error: any, entity: string) {
    Logger.log(`The Error: ${error}`);
    switch (error?.code) {
      case PostgresErrorCode.UniqueViolation:
        throw new BadRequestException({
          error: 'Entity Exists',
          description: `The ${entity} is already registered`,
        });

      default:
        throw new BadRequestException({
          error: 'Error while updating',
          description: error,
        });
        break;
    }
  }
}
