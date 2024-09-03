import { BaseHandler } from "./BaseHandler.js";

export class CancelHandler extends BaseHandler {
    handle(message, client){
        if(message.body.toLowerCase().includes("cancelar")){
            //complex logic
            client.sendText(message.from, "cancelar turno");
        } else {
            super.handle(message, client)
        }
    }
}