import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { AttendanceService } from '../attendance/attendance.service';
import { IcsCreateInvite } from './domain/ics-create-invite';
import { IcsInvite } from './domain/ics-invite';
import { createEvent, EventAttributes } from 'ics';
import type { v2 as CloudinaryType } from 'cloudinary';

@Injectable()
export class IcsService {
  constructor(private readonly eventService: EventService) {}

  async generateIcsContent(eventId: number) {
    const event = await this.eventService.findEventOrThrow(eventId);
    const icsEvent: EventAttributes = {
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
    };

    const { error, value } = createEvent(icsEvent);

    if (error || !value) {
      throw new Error('Failed to create ICS event');
    }
    
    return value;
  }
}
