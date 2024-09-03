import { availableAppointments } from "../../controllers/schedule.controller.js";
import { appointmentStorage } from "../../states/appointmentStorage.js";
import { handlersStates } from "../../states/context.js";
import { createMessageOfAppointments } from "../../utils/createMessageOfAppointments.js";
import { BaseHandler } from "./BaseHandler.js";

export class ScheduleHandler extends BaseHandler {
    async handle(message, client){
        if(message.body.toLowerCase().includes("agendar")){
            const context = new handlersStates(message.from)
            context.schedule() //cambio el estado
            const apptStorage = new appointmentStorage(message.from)
            
            client.sendText(message.from, "Estoy consultando la agenda para ver los turnos disponibles...");

            const availableAppts = await availableAppointments()
            apptStorage.saveAppointments(availableAppts) //guardo los turnos para luego saber cual elige el cliente

            client.sendText(message.from, "Los horarios disponibles de esta semana son: ")
            client.sendText(message.from, createMessageOfAppointments(message.from))
            client.sendText(message.from, "¿Desea agendar un turno? Si, No, Proxima semana (para ver más turnos disponibles)")
        } else {
            super.handle(message, client)
        }
    }
}