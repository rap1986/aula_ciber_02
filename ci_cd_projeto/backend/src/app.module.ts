import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [
    //
    ConfigModule.forRoot({ isGlobal: true }), // Carrega variáveis de ambiente
    MikroOrmModule.forRoot(mikroOrmConfig), // Integra o MikroORM
    UsersModule,
  ],
})
export class AppModule {}
