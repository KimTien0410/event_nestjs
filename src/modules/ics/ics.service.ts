import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { AttendanceService } from '../attendance/attendance.service';
import { IcsCreateInvite } from './domain/ics-create-invite';
import { IcsInvite } from './domain/ics-invite';
import { createEvent, EventAttributes } from 'ics';
import type { v2 as CloudinaryType } from 'cloudinary';

@Injectable()
export class IcsService {
  constructor(
    private readonly eventService: EventService,
    private readonly attendanceService: AttendanceService,
    @Inject('CLOUDINARY')
    private readonly cloudinary: typeof CloudinaryType
  ) { }
  async sendICSInvite(icsCreateInvite: IcsCreateInvite): Promise<IcsInvite> {
    const event = await this.eventService.findEventOrThrow(icsCreateInvite.eventId);

    const attendances = await this.attendanceService.getUserAttendances(
      icsCreateInvite.userId, icsCreateInvite.eventId
    );

    if (!attendances.length) {
      throw new NotFoundException('No attendance found for the user in this event');
    }

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

      attendees: attendances.map((att) => ({
        email: att.email,
        name: att.name || 'Attendee',
      })),

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

    const icsContent: string = value; 

    const uploadResult = await this.cloudinary.uploader.upload(
      `data:text/calendar;base64,${Buffer.from(icsContent).toString('base64')}`,
      {
        resource_type: 'raw',
        folder: 'ics-events',
        public_id: `event-${event.id}`,
        overwrite: true,
        format: 'ics',
      },
    );

    return {
      message: `ICS invite uploaded for ${attendances.length} attendees`,
      linkUrl: uploadResult.secure_url,
    };
  }
}
