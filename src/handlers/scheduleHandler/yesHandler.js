import { BaseHandler } from "./BaseHandler.js";

export class yesHandler extends BaseHandler {
    async handle(message, client){
        if(message.body.toLowerCase().includes("si")){
            client.sendText(message.from, "yes");
        } else {
            super.handle(message, client)
        }
    }
}