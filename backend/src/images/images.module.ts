import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  // ImageAccessGuard to do later
  imports: [DatabaseModule],
  providers: [ImagesService],
  exports: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
