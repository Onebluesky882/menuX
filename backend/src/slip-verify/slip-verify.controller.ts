import { Body, Controller, Param, Post } from '@nestjs/common';
import { SlipVerifyService } from './slip-verify.service';
import { PostSlipDto } from './slipVerify.dto';

@Controller('slip-verify')
export class SlipVerifyController {
  constructor(private readonly slipVerifyService: SlipVerifyService) {}

  @Post()
  post(@Body() body: PostSlipDto) {
    return this.slipVerifyService.postCodeToVerify(body);
  }
}
