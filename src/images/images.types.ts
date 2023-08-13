import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { IGridFSObject } from 'mongo-gridfs';

export class Image implements IGridFSObject {
  @ApiProperty({ type: String })
  _id: ObjectId;
  @ApiProperty()
  length: number;
  @ApiProperty()
  chunkSize: number;
  @ApiProperty()
  filename: string;
  @ApiProperty()
  uploadDate: Date;
}
