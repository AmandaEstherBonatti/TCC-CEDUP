import { Body, Controller, Post } from '@nestjs/common';
import { PusherService } from './message.service';

@Controller("api/v1/chat")
export class MessageController {
    constructor(private pusherService: PusherService) {

    }

    @Post("message")
    async message(
        @Body('username') username: string,
        @Body('message') message: string
    ) {
        await this.pusherService.trigger('chat', 'message', {
            username,
            message
        });

        return [];


    }
}
