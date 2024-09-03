import { BaseHandler } from "./BaseHandler.js";

export class DefaultHandler extends BaseHandler {
    handle(message, client) {
        console.log(`Default handler: No specific handler for this message: ${message.body}`);
        client.sendText(message.from, "Lo siento, no entendí tu mensaje. Por favor elige una opción del menú: 'Informacion', 'Agendar', 'cancelar' o 'otro'.");
      }
}