import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

const UUID_PIPE = new ParseUUIDPipe({
  exceptionFactory: () =>
    new BadRequestException({
      message: 'Invalid Id',
      description: `Please provide a valid uuid type id`,
    }),
});

export const VALIDATION_PIPES = {
  UUID_PIPE,
};
