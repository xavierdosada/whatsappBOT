import { DefaultHandler } from "../handlers/startHandler/DefaultHandler.js";
import { CancelHandler } from "../handlers/startHandler/CancelHandler.js";
import { ScheduleHandler } from "../handlers/startHandler/ScheduleHandler.js";
import { InfoHandler } from "../handlers/startHandler/InfoHandler.js";
import { GreetingHandler } from "../handlers/startHandler/GreetingHandler.js";
import { scheduleState } from "./scheduleState.js";

export class startState{
    constructor(){
        this.defaultHandler = new DefaultHandler();
        this.cancelHandler = new CancelHandler(this.defaultHandler);
        this.scheduleHandler = new ScheduleHandler(this.cancelHandler);
        this.infoHandler = new InfoHandler(this.scheduleHandler);
        this.greetingHandler = new GreetingHandler(this.infoHandler);
    }

    handle(message, client) {
        this.greetingHandler.handle(message, client);
    }

    schedule(){
        return new scheduleState()
    }
}