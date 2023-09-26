import { Topic } from './entities/topic.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TopicController } from './controllers/topic.controller';
import { TopicService } from './services/topic.service';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mateus-NBD123',
      database: 'prm_2023',
      entities: [User, Topic],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Topic]),
  ],
  controllers: [
    AppController,
    ProfileController,
    UserController,
    TopicController,
  ],
  providers: [AppService, ProfileService, UserService, TopicService],
})
export class AppModule {}
