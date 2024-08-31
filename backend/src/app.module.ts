import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Home } from './entities/home.entity';
import { State } from './entities/state.entity';
import { UserHome } from './entities/user-home.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { HomeController } from './home/home.controller';
import { HomeService } from './home/home.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'db_user',
      password: '6equj5_db_user',
      database: 'home_db',
      entities: [User, State, Home, UserHome],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, State, Home, UserHome]),
  ],
  controllers: [AppController, UserController, HomeController],
  providers: [AppService, UserService, HomeService],
})
export class AppModule {}
