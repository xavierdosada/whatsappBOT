import { NextWeekHandler } from "../handlers/scheduleHandler/nextWeekHandler.js";
import { noHandler } from "../handlers/scheduleHandler/noHandler.js";
import { yesHandler } from "../handlers/scheduleHandler/yesHandler.js";
import { DefaultHandler } from "../handlers/scheduleHandler/DefaultHandler.js";

export class scheduleState{
    constructor(){
        this.defaultHandler = new DefaultHandler();
        this.nextWeekHandler = new NextWeekHandler(this.defaultHandler);
        this.noHandler = new noHandler(this.nextWeekHandler);
        this.yesHandler = new yesHandler(this.noHandler);
    }

    handle(message, client) {
        this.yesHandler.handle(message, client);
    }
}