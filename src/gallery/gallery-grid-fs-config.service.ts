import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';

const { NODE_ENV } = process.env;

@Injectable()
export class GalleryGridFsConfigService implements MulterOptionsFactory {
  gridFsStorage;
  constructor() {
    this.gridFsStorage = new GridFsStorage({
      url:
        NODE_ENV === 'production'
          ? 'mongodb://mongo:27017/louvre-api'
          : 'mongodb://localhost:27017/louvre-api',
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename: filename,
            bucketName: 'gallery',
          };
          resolve(fileInfo);
        });
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
