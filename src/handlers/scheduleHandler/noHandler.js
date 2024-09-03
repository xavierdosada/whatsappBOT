import { handlersStates } from "../../states/context.js";
import { BaseHandler } from "./BaseHandler.js";

export class noHandler extends BaseHandler {
    async handle(message, client){
        if(message.body.toLowerCase().includes("no")){
            client.sendText(message.from, "Muchas gracias por comunicarte, estamos a tu disposición, saludos!");
            const context = new handlersStates(message.from)
            context.deleteInstance(message.from)
        } else {
            super.handle(message, client)
        }
    }
}