import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { R2Service } from './r2.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('r2')
export class R2Controller {
  constructor(private readonly r2Service: R2Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    console.log('got file', file);
    const result = await this.r2Service.uploadFile(file);
    console.log('result :', result);
    
    // func insert image path/key into menu table -> col img_path /123-345asd-vzxc.jpg -> {endpoint}/{path}
    // <img src={menu.url} />
    // url -> (uuid-img).jpg
    // url -> (shop-id)/(uuid-img).jpg -> (shop-id)/*
    return result;
  }
}
