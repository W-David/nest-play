import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { join } from 'path'
import { TypeGraphQLModule } from 'typegraphql-nestjs'

@Module({
  providers: [],
  imports: [
    TypeGraphQLModule.forRoot({
      driver: ApolloDriver,
      emitSchemaFile: join(process.cwd(), 'src/auto-generated.graphql'),
      validate: false,
      context: () => ({ prisma: new PrismaClient() }),
    }),
  ],
})
export class AppModule {}
