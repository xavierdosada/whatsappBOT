import { BaseHandler } from "./BaseHandler.js";

export class GreetingHandler extends BaseHandler {
    handle(message, client){
        if(message.body.toLowerCase().includes("hola")){
            //complex logic
            client.sendText(message.from, "Hola! En que te puedo ayudar: Informacion, Agendar, Cancelar, Otro");
        } else {
            super.handle(message, client)
        }
    }
}