import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gallery, GalleryDocument } from './gallery.schema';
import { Model } from 'mongoose';
import { ImagesService } from 'src/images/images.service';

const { NODE_ENV } = process.env;

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<Gallery>,
    private readonly imagesService: ImagesService,
  ) {}
  async create(image: Express.Multer.File): Promise<GalleryDocument> {
    const baseUrl =
      NODE_ENV === 'production'
        ? 'https://api.kiriushkin.pro/louvre-api/images/'
        : 'http://localhost:3000/images/';

    const newGalleryDoc: Gallery = {
      imageId: image.id,
      imageUrl: baseUrl + image.id,
    };

    return await this.galleryModel.create(newGalleryDoc);
  }

  async getImages(): Promise<GalleryDocument[]> {
    return this.galleryModel.find();
  }

  async getImage(id: string): Promise<GalleryDocument> {
    const doc = await this.galleryModel.findById(id);
    if (!doc) throw new NotFoundException();
    return doc;
  }

  async deleteImage(id: string) {
    const doc = await this.getImage(id);
    await this.imagesService.deleteImage(doc.imageId);

    return await this.galleryModel.deleteOne({ _id: id });
  }
}
