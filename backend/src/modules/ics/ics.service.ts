import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { createEvents, EventAttributes } from 'ics';
import { AttendanceService } from '../attendance/attendance.service';
import { Uuid } from 'src/common/types';

@Injectable()
export class IcsService {
  constructor(
    private readonly eventService: EventService,
    private readonly attendanceService: AttendanceService,
  ) { }


  async getEventsByUser(userId: Uuid): Promise<string> {
    const events = await this.attendanceService.getEventsByUser(userId);

    const icsEvents: EventAttributes[] = events.map((event) => ({
      title: event.title,
      description: event.description || undefined,
      start: [
        event.timeStart.getFullYear(),
        event.timeStart.getMonth() + 1,
        event.timeStart.getDate(),
        event.timeStart.getHours(),
        event.timeStart.getMinutes(),
      ],
      end: [
        event.timeEnd.getFullYear(),
        event.timeEnd.getMonth() + 1,
        event.timeEnd.getDate(),
        event.timeEnd.getHours(),
        event.timeEnd.getMinutes(),
      ],
      location: event.venue
        ? `${event.venue}, ${event.location}`
        : event.location,
      status: 'CONFIRMED',
      uid: `event-${event.id}@eventnestjs.com`,
      alarms: [
        {
          action: 'display',
          description: 'Reminder',
          trigger: { minutes: 30, before: true },
        },
      ],
    }));

    const { error, value } = createEvents(icsEvents);

    if (error || !value) {
      throw new Error('Failed to generate calendar');
    }

    return value;
  }
}