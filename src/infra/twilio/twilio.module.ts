import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import * as twilio from 'twilio';

@Module({
    providers: [TwilioService],
    exports: [TwilioService],
})
export class TwilioModule {}

