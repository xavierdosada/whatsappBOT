export class BaseHandler {
    constructor(nextHandler = null){
        this.nextHandler = nextHandler
    }

    handle(message, client) {
        if (this.nextHandler) {
          this.nextHandler.handle(message, client);
        }
      }
}