import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { GalleryModule } from './gallery/gallery.module';
import { ImagesModule } from './images/images.module';

const { NODE_ENV } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(
      NODE_ENV === 'production'
        ? 'mongodb://mongo:27017/louvre-api'
        : 'mongodb://localhost:27017/louvre-api',
    ),
    OrdersModule,
    ConfigModule.forRoot(),
    GalleryModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
