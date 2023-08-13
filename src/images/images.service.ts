import { Injectable, StreamableFile, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import { GridFSBucketReadStream } from 'mongodb';
import { Connection } from 'mongoose';

@Injectable()
export class ImagesService {
  private imagesModel: MongoGridFS;
  constructor(@InjectConnection() private readonly connection: Connection) {
    this.imagesModel = new MongoGridFS(this.connection.db, 'gallery');
  }

  async getImageInfo(id: string) {
    try {
      return await this.imagesModel.findById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getImageById(id: string) {
    const imageInfo = await this.getImageInfo(id);

    const stream: GridFSBucketReadStream =
      await this.imagesModel.readFileStream(id);
    return new StreamableFile(stream, { type: imageInfo.contentType });
  }

  async getImages() {
    return await this.imagesModel.find({});
  }

  async deleteImage(id: string) {
    await this.getImageInfo(id);

    return await this.imagesModel.delete(id);
  }
}
