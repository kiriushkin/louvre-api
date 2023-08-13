import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type GalleryDocument = HydratedDocument<Gallery>;

@Schema()
export class Gallery {
  @Prop({ required: true })
  @ApiProperty()
  imageId: string;

  @Prop({ required: true })
  @ApiProperty()
  imageUrl: string;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
