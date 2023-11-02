import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  NotFoundException,
  applyDecorators,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    switch (exception.code) {
      case 'P2000':
        super.catch(new BadRequestException(), host);
      case 'P2002':
        super.catch(new ConflictException(), host);
      case 'P2025':
        super.catch(new NotFoundException(), host);
      default:
        super.catch(exception, host); // Throws default 500 error
        break;
    }
  }
}

export function ApiPrismaClientHttpExceptions() {
  return applyDecorators(
    ApiNotFoundResponse({ description: 'Not found' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiConflictResponse({ description: 'Conflict' }),
  );
}
