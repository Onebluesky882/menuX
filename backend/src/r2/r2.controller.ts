import {
  Body,
  Controller,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { R2Service } from './r2.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from 'src/images/images.service';
import { ImageDto } from '../images/images.dto';
import { AuthRequest } from 'types/auth';
import { AuthGuard } from '@nestjs/passport';
@Controller('r2')
export class R2Controller {
  constructor(
    private readonly r2Service: R2Service,
    private readonly imagesService: ImagesService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthRequest,
    @Body() body: { type: string; shopId: string; menuId: string },
  ) {
    const userId = req.user.id;
    const result = await this.r2Service.uploadFile(file);

    const image: ImageDto = {
      type: body.type,
      imageUrl: result,
      menuId: body.menuId,
      shopId: body.shopId,
    };

    const picture = await this.imagesService.postImage(image, userId);
    console.log(picture);

    return result;
  }
}
