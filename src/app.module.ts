import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AuthGuard } from './auth/auth.guard'
import { AuthModule } from './auth/auth.module'
import { CatsModule } from './cats/cats.module'
import { AllExceptionsFilter, HttpExceptionFilter } from './common/exception.filter'
import { logger as LoggerMiddleware } from './common/logger.middleware'
import { PostModule } from './post/post.module'
import { UsersModule } from './users/users.module'

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }, {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  imports: [
    CatsModule,
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [PostModule],
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./src/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'graphql.ts'),
        outputAs: 'class',
        emitTypenameField: true,
        skipResolverArgs: true,
      }
    }),
    PostModule
  ],
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats')
  }
}
