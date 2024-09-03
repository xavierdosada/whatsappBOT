import { format } from 'date-fns-tz';

export const formatDateTime = (dateTime) => {
    const timeZone = 'America/Argentina/Buenos_Aires'; // Zona horaria GMT-3
    const utcDate = new Date(dateTime);

    const date = format(utcDate, 'dd-MM-yyyy', { timeZone });
    //formato 'HH:mm' (sin segundos)
    const time = format(utcDate, 'HH:mm', { timeZone });

    return { date, time }
}