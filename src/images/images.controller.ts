import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { Image } from './images.types';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  @ApiOkResponse({ type: [Image] })
  async getImages() {
    return await this.imagesService.getImages();
  }

  @Get(':id')
  @ApiOkResponse({ type: Image })
  async getById(@Param('id') id: string) {
    return await this.imagesService.getImageById(id);
  }
}
