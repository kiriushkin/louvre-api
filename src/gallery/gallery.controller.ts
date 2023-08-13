import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GalleryService } from './gallery.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Gallery } from './gallery.schema';

@ApiTags('gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiCreatedResponse({ type: Gallery })
  async create(@UploadedFile() image) {
    return await this.galleryService.create(image);
  }

  @Get()
  @ApiOkResponse({ type: [Gallery] })
  async getImages() {
    return await this.galleryService.getImages();
  }

  @Get(':id')
  @ApiOkResponse({ type: Gallery })
  async getImage(@Param('id') id: string) {
    return this.galleryService.getImage(id);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteImage(@Param('id') id: string) {
    return this.galleryService.deleteImage(id);
  }
}
