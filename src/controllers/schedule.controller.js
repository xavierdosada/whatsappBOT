import { getCalendarEvents } from "../controllers/calendar.controller.js";
import { formatDate } from "../utils/formatDate.js";
import { getNextFriday } from "../utils/getNextFriday.js";
import { workdays } from "../utils/worksDays.js";

export const availableAppointments = async (dateMin) => {
  const dateMax = getNextFriday(dateMin);

  const events = await getCalendarEvents({
    timeMin: dateMin,
    timeMax: dateMax,
  });

  const daysWithEvents = new Set(
    events.map((event) => {
      const typeDate = new Date(event.start.dateTime);
      return typeDate.getDay();
    })
  );

  // Establecer una fecha base para el cálculo
  const baseDate = dateMin ? new Date(dateMin) : new Date();
  baseDate.setHours(0, 0, 0, 0);

  // Filtrar los días que están marcados como 'FREE'
  const filteredWorkdays = workdays.map((hours) => {
    // No procesar los días que están completamente 'FREE'
    if (hours.length === 1 && hours[0] === 'FREE') {
      return null;
    }

    return hours;
  });

  const availableDateTime = filteredWorkdays.map((hours, dayOfWeek) => {
    const dayName = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ][dayOfWeek];

    // Calcular la fecha para el día de la semana actual
    const date = new Date(baseDate);
    const firstDayOfWeek = baseDate.getDate() - baseDate.getDay() + dayOfWeek;
    date.setDate(firstDayOfWeek);
    date.setHours(0, 0, 0, 0);
    const formattedDate = formatDate(date);

    // Si el día es 'FREE', se omite
    if (hours === null) {
      return null;
    }

    // Si el día actual tiene eventos
    if (daysWithEvents.has(dayOfWeek)) {
      const eventsOnDay = events.filter((event) => {
        const eventDate = new Date(event.start.dateTime);
        return eventDate.getDay() === dayOfWeek;
      });

      const occupiedHours = eventsOnDay.map((event) => {
        const eventTime = new Date(event.start.dateTime).toLocaleTimeString(
          "es-AR",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }
        );
        return eventTime;
      });

      const availableHours = hours.filter(
        (hour) => hour !== "FREE" && !occupiedHours.includes(hour)
      );

      return { date: formattedDate, dayName, availableHours };
    } else {
      return {
        date: formattedDate,
        dayName,
        availableHours: hours.filter((hour) => hour !== "FREE"),
      };
    }
  }).filter(day => day !== null);

  return availableDateTime;
};
