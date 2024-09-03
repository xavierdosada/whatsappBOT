export const getNextMonday = (date) => {
    // Usar la fecha proporcionada o la fecha de hoy
    const today = date ? new Date(date) : new Date();
    const offsetMinutes = -180; 
    // Ajustar la fecha a GMT-3
    const GTM_3 = new Date(today.getTime() + offsetMinutes * 60 * 1000);

    // (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const dayOfWeek = GTM_3.getDay();

    // Calculo la diferencia de días hasta el próximo lunes
    let daysUntilMonday = (1 - dayOfWeek + 7) % 7;

    // Si hoy es lunes, ajusta para obtener el próximo lunes (7 días después)
    if (daysUntilMonday === 0) {
        daysUntilMonday = 7;
    }

    // Calcula la fecha del próximo lunes
    GTM_3.setDate(GTM_3.getDate() + daysUntilMonday);
    // Establece la hora en 20:00:00 (8 PM) en la zona horaria GMT-3
    GTM_3.setHours(20, 0, 0, 0); // 20:00:00

    return GTM_3;
}
