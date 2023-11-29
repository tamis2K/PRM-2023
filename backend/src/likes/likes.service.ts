import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Likes } from './likes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private readonly repository: Repository<Likes>,
  ) {}

  create(comment: Likes): Promise<Likes> {
    return this.repository.save(comment);
  }
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
