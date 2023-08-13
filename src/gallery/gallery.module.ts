import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { MulterModule } from '@nestjs/platform-express';
import { GalleryGridFsConfigService } from './gallery-grid-fs-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Gallery, GallerySchema } from './gallery.schema';
import { ImagesService } from 'src/images/images.service';

@Module({
  imports: [
    MulterModule.registerAsync({ useClass: GalleryGridFsConfigService }),
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
  ],
  controllers: [GalleryController],
  providers: [GalleryGridFsConfigService, GalleryService, ImagesService],
})
export class GalleryModule {}
