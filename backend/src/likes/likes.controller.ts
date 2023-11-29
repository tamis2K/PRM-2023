import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from 'src/comments/comment.service';
import { LikesService } from './likes.service';
import { AuthService } from 'src/auth/auth.service';
import { Likes } from './likes.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('likes')
export class LikesContrller {
  constructor(
    private readonly service: LikesService,
    private readonly commentService: CommentService,
  ) {}

  @UseGuards(AuthService)
  @Post()
  create(@Body() comment: Likes): Promise<Likes> {
    return this.service.create(comment);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.delete(id);
  }
}
