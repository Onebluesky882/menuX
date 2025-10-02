import { Module } from '@nestjs/common';
import { ImagesModule } from '../images/images.module';
import { R2Controller } from './r2.controller';
import { R2Service } from './r2.service';

@Module({
  imports: [ImagesModule],
  providers: [R2Service],
  controllers: [R2Controller],
  exports: [R2Module],
})
export class R2Module {}
