import { Body, Controller, Post } from '@nestjs/common';
import { PostSlipDto } from './slip-verifications.dto';
import { SlipVerificationsService } from './slip-verifications.service';

@Controller('slip-verifications')
export class SlipVerificationsController {
  constructor(
    private readonly slipVerificationsService: SlipVerificationsService,
  ) {}

  @Post()
  post(@Body() body: PostSlipDto) {
    return this.slipVerificationsService.postCodeToVerify(body);
  }
}
