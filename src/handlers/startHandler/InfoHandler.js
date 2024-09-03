import { BaseHandler } from "./BaseHandler.js";

export class InfoHandler extends BaseHandler {
    handle(message, client){
        if(message.body.toLowerCase().includes("informacion")){
            //complex logic
            client.sendText(message.from, "Aquí tienes la información que solicitaste...");
        } else {
            super.handle(message, client)
        }
    }
}