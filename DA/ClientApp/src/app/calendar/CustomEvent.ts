import { CalendarEvent } from "angular-calendar";

export interface CustomEvent extends CalendarEvent {
  isFree: boolean;
  isHoliday: boolean;
  hasMoreDays: boolean;
  outOfMonth: boolean;

}
