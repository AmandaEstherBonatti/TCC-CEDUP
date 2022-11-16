import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';


@Injectable()
export class PusherService {
    pusher: Pusher;

    constructor() {
        this.pusher = new Pusher({
            appId: "1502294",
            key: "c1153228710bff5d6c2e",
            secret: "9764cef4317ae69b2812",
            cluster: "us2",
            useTLS: true
        });
    }

    async trigger(channel: string, event: string, data: any) {
        await this.pusher.trigger(channel, event, data);
    }
}
