import { ApolloDriver } from '@nestjs/apollo'
import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { join } from 'path'
import { TypeGraphQLModule } from 'typegraphql-nestjs'
import { AuthModule } from './auth/auth.module'
import { CatsController } from './cats/cats.controller'
import { CatsModule } from './cats/cats.module'
import { AllExceptionsFilter } from './common/exception.filter'
import { LoggerMiddleware } from './common/logger.middleware'
import { PostModule } from './post/post.module'
import { UsersModule } from './users/users.module'

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  imports: [
    CatsModule,
    AuthModule,
    UsersModule,
    TypeGraphQLModule.forRoot({
      driver: ApolloDriver,
      emitSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      validate: false,
      include: [PostModule],
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   include: [PostModule],
    //   driver: ApolloDriver,
    //   playground: false,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // }),
    PostModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController)
  }
}
