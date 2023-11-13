import { Injectable } from '@nestjs/common';
import { CreateMediaInput } from './dto/create-media.input';
import { Media } from './entities/media.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
  private readonly medias: Media[] = [];

  create(createMediaInput: CreateMediaInput) {
    const obj = {
      id: uuidv4(),
      ...createMediaInput
    }
    this.medias.push(obj);
    return createMediaInput;
  }

  findAllByUserId(userId: string) {
    return this.medias.filter((media) => media.userId === userId);
  }

  findOneByMediaId(id: string) {
    return this.medias.find((media) => media.id === id);
  }

  removeByMediaId(id: string) {
    const index = this.medias.findIndex((media) => media.id === id);
    this.medias.splice(index, 1)
    return true;
  }
}
