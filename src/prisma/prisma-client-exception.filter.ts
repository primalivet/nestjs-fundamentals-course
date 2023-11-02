import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  HttpException,
  InternalServerErrorException,
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
import { GqlExceptionFilter,} from '@nestjs/graphql';

export function translateException<T>(exception: T): T | HttpException {
  if (exception instanceof Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2000':
        return new BadRequestException();
      case 'P2002':
        return new ConflictException();
      case 'P2025':
        return new NotFoundException();
      default:
        return new InternalServerErrorException(); // Make sure we dont propogate Prisma errors
    }
  }

  return exception;
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilterGQL implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    // const gqlHost = GqlArgumentsHost.create(host);
    const translatedException = translateException(exception);
    return translatedException;
  }
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const translatedException = translateException(exception);
    super.catch(translatedException, host);
  }
}

export function ApiPrismaClientHttpExceptions() {
  return applyDecorators(
    ApiNotFoundResponse({ description: 'Not found' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiConflictResponse({ description: 'Conflict' }),
  );
}
