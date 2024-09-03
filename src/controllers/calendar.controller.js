import { calendar_mgr } from "../dao/managers/calendar.manager.js";

const calendar_manager = new calendar_mgr();

export const getCalendarEvents = async (eventData) => {
  const { calendar_type = "primary", timeMin = new Date().toISOString(), timeMax } = eventData || {}
  if(!timeMax) throw new Error('timeMax is mandatory')

  const query = {
    calendarId: calendar_type,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: "startTime",
  };
  
  const events = await calendar_manager.getEvents(query);
  return events;
};

export const insertEvent = async (eventData) => {
  const event = {
    summary: "Sesión de Terapia",
    location: "Online",
    description: "Turno Online",
    start: {
      dateTime: "2024-08-14T15:00:00-03:00", // Hora en Buenos Aires
      timeZone: "America/Argentina/Buenos_Aires",
    },
    end: {
      dateTime: "2024-08-14T16:00:00-03:00", // Hora en Buenos Aires (una hora después del inicio)
      timeZone: "America/Argentina/Buenos_Aires",
    },
    attendees: [{ email: "chiarijaz19@gmail.com" }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 40 },
      ],
    },
  };

  const insertEvent = await calendar_manager.newEvent(event);
};

export const deleteEvent = async (eventData) => {
  const { calendar_type, eventId } = eventData;
  if (!eventId) throw new Error("EventId is mandatory");

  const deleteQuery = {
    auth: auth,
    calendarId: calendar_type || "primary",
    resource: eventId,
  };

  const res = await calendar_manager.deleteEvent(deleteQuery);
  return res
};
