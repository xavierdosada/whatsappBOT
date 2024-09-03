import { appointmentStorage } from "../states/appointmentStorage.js";

export const createMessageOfAppointments = (whatsappNumber) => {
    const apptStorage = new appointmentStorage(whatsappNumber)
    console.log('apptStorage en createMessageOfAppointments: ', {apptStorage})
    //Genero el mensaje de horarios disponibles
        const availableAppts = apptStorage.getAppointments()
        let index = 0
        const messageHours = availableAppts.map((dateAndTime) => {
            const { date, availableHours } = dateAndTime;

            // Enumero las horas
            const hoursList = availableHours.map((hour) => {
                index += 1 
                return`${index}. ${hour}`
            }).join('\n');
            
            // Construir el mensaje final
            const message_date = `Día ${date}:\n${hoursList}`;
            return message_date;
        });

        // Concatenar todos los mensajes en una sola cadena
        const singleMessage = messageHours.join('\n\n');
        return singleMessage
}