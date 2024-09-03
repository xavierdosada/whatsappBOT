export const getNextFriday = (date) => {
    // Usar la fecha proporcionada o la fecha de hoy
    const today = date ? new Date(date) : new Date();
    const offsetMinutes = -180; 
    // Ajustar la fecha a GMT-3
    const GTM_3 = new Date(today.getTime() + offsetMinutes * 60 * 1000);

    // (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const dayOfWeek = GTM_3.getDay();

    // Calculo la diferencia de días hasta el próximo viernes
    let daysUntilFriday = (5 - dayOfWeek + 7) % 7;

    // Si hoy es viernes, ajusta para obtener el próximo viernes (7 días después)
    if (daysUntilFriday === 0) {
        daysUntilFriday = 7;
    }

    // Calcula la fecha del próximo viernes
    GTM_3.setDate(GTM_3.getDate() + daysUntilFriday);
    // Al setear la hora en 20 setHours seteara en UTC es decir, 3 horas más, devolvera 23hs
    GTM_3.setHours(20, 0, 0, 0); //23:00:00

    return GTM_3;
}
