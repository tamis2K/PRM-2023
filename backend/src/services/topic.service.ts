import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from 'src/entities/topic.entity';
import { ApplicationException } from 'src/excpitions';
import { Repository } from 'typeorm';

@Injectable()
export class TopicService {
  create(user: Topic): Promise<Topic> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Topic)
    private readonly repository: Repository<Topic>,
  ) {}

  findAll(): Promise<Topic[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<Topic> {
    return this.repository.findOneBy({ id: id });
  }

  craete(topic: Topic): Promise<Topic> {
    return this.repository.save(topic);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async update(id: number, topic: Topic): Promise<Topic> {
    const found = await this.repository.findOneBy({ id: id });

    if (!found) {
      throw new ApplicationException('Topic not found', 404);
    }
    //Garante que o objeto subistituido o mesmo da requesição

    topic.id = id;

    return this.repository.save(topic);
  }
}
