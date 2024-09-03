import { handlersStates } from "../states/context.js";

export const start = (client) => {
  client.onMessage((message) => {
    const context = new handlersStates(message.from)
    //Inicio la instancia
    context.handle(message, client);
  });
};
