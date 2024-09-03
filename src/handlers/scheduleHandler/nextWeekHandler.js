import { availableAppointments } from "../../controllers/schedule.controller.js";
import { appointmentStorage } from "../../states/appointmentStorage.js";
import { createMessageOfAppointments } from "../../utils/createMessageOfAppointments.js";
import { getNextMonday } from "../../utils/getNextMonday.js";
import { BaseHandler } from "./BaseHandler.js";

export class NextWeekHandler extends BaseHandler {
    async handle(message, client){
        if(message.body.toLowerCase().includes("proxima semana")){
            client.sendText(message.from, "Los horarios de la próxima semana son: ");

            // Creo la instancia de appointmentStorage
            const apptStorage = new appointmentStorage(message.from);
            console.log('apptStorage en nextWeekHandler:', apptStorage);
            
            // Obtengo la fecha del próximo lunes
            const nextMonday = getNextMonday();
            
            // Obtengo los turnos disponibles para la próxima semana
            const availableAppts = await availableAppointments(nextMonday);
            
            // Guarda los turnos en la instancia de appointmentStorage
            apptStorage.saveAppointments(availableAppts);
            
            // Crea el mensaje para enviar al cliente
            const messageAppts = createMessageOfAppointments(message.from);
            console.log('messageAppts:', messageAppts);
            
            // Envía el mensaje al cliente
            client.sendText(message.from, messageAppts);
        } else {
            super.handle(message, client);
        }
    }
}
