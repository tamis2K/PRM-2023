import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserModule } from 'src/users/user.module';
import { Likes } from './likes.entity';
import { CommentModule } from 'src/comments/comment.module';
import { Comment } from 'src/comments/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Likes, Comment, User]),
    CommentModule,
    UserModule,
  ],
  providers: [],
  controllers: [],
})
export class LikesModule {}
