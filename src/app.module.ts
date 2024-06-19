import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { join } from 'path'
import { TypeGraphQLModule } from 'typegraphql-nestjs'
import { PostCrudResolver, ProfileCrudResolver, UserCrudResolver } from '../prisma/generated/type-graphql'

const prisma = new PrismaClient()

@Module({
  providers: [UserCrudResolver, PostCrudResolver, ProfileCrudResolver],
  imports: [
    TypeGraphQLModule.forRoot({
      driver: ApolloDriver,
      emitSchemaFile: join(process.cwd(), 'src/auto-generated.graphql'),
      validate: false,
      context: () => ({ prisma }),
    }),
  ],
})
export class AppModule {}
