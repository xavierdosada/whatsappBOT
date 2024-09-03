import { BaseHandler } from "./BaseHandler.js";

export class DefaultHandler extends BaseHandler {
    handle(message, client) {
        client.sendText(message.from, "Lo siento, no entendí tu mensaje. Por favor escribe una opción del menú: 'Si', 'No', o 'Proxima semana'");
    }
}