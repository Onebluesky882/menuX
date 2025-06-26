import { Module } from '@nestjs/common';
import { ImageAccessGuard } from 'src/common/guards/image-access.guard';
import { ImagesService } from './images.service';
import { DatabaseModule } from 'src/database/database.module';
import { ValidateModule } from 'src/common/validate/validate.module';
import { ImagesController } from './images.controller';

@Module({
  // ImageAccessGuard to do later
  imports: [DatabaseModule, ValidateModule],
  providers: [ImagesService, ImageAccessGuard],
  exports: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
