import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { AttendanceService } from '../attendance/attendance.service';
import * as nodemailer from 'nodemailer';
import { IcsCreateInvite } from './domain/ics-create-invite';
import { IcsInvite } from './domain/ics-invite';
import { createEvent, EventAttributes } from 'ics';
import { In } from 'typeorm';


@Injectable()
export class IcsService {
  constructor(
    private readonly eventService: EventService,
    private readonly attendanceService: AttendanceService
  ) { }
  
  private createTransporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  
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


    if (error) {
      throw new Error('Failed to create ICS event');
    }

    const icsContent = value;

    const transporter = this.createTransporter();

    const mailPromises = attendances.map(att => {
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: att.email,
        subject: `Invitation: ${event.title}`,
        text: icsCreateInvite.description || 'You are invited to the event!',
        attachments: [
          {
            filename: `event-${event.id}.ics`,
            content: icsContent,
            contentType: 'text/calendar; method=REQUEST',
          },
        ],
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(mailPromises);

    return {
      message: `ICS invite sent to ${attendances.length} attendees`,
      icsContent
    };
  }
}
