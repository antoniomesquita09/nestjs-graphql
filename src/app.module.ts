import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import RepoModule from './repo.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as TypeOrmOptions from './config/orm';

import UserResolver from './user/user.resolver';
import MessageResolver from './message/message.resolver';

const graphQLImports = [UserResolver, MessageResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmOptions),
    RepoModule,
    ...graphQLImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      typePaths: ['./**/*.graphql'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
