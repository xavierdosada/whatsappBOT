import { google } from "googleapis";
import { calendarAuthorize } from "../../api/calendar/index.js";

export class calendar_mgr {
  constructor() {}

  async getEvents(query) {
    try {
      const auth = await calendarAuthorize();
      console.log({auth})
      const calendar = google.calendar({ version: "v3", auth });

      const res = await calendar.events.list(query);

      return res.data?.items;
    } catch (error) {
      throw new Error(error);
    }
  }

  async newEvent(query) {
    try {
      const auth = await calendarAuthorize();
      const calendar = google.calendar({ version: "v3", auth });

      const res = await calendar.events.insert(query)

      return res
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteEvent(deleteQuery){
    try {
        const auth = await calendarAuthorize();
        const calendar = google.calendar({ version: "v3", auth });

        const res = await calendar.events.delete(deleteQuery);
        return res;
      } catch (error) {
        throw new Error(error);
      }
  }
}
