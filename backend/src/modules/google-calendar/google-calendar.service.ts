import { AttendanceService } from './../attendance/attendance.service';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { EventService } from '../event/event.service';
import { Uuid } from 'src/common/types';
import { EventType } from '../event/domain/event-type';
import { EventStatus } from '../event/domain/event-status';
import { Event } from '../event/domain/event';
import { EventEntity } from '../event/entities/event.entity';

@Injectable()
export class GoogleCalendarService {
  constructor(
    private readonly eventService: EventService,
    private readonly attendanceService: AttendanceService,
  ) {}
  async importCalendar(userId: Uuid, accessToken: string): Promise<Event[]> {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const now = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(now.getFullYear() + 1);

    const eventsRes = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: oneYearLater.toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = eventsRes.data.items || [];
    const results: EventEntity[] = [];

    for (const event of events) {
      if (!event.id) continue;

      let eventEntity = await this.eventService.findByGoogleEventId(event.id);

      if (!eventEntity) {
        eventEntity = await this.eventService.createEventEntity({
          googleEventId: event.id,
          title: event.summary || 'No title',
          timeStart: event.start?.dateTime
            ? new Date(event.start.dateTime)
            : new Date(event.start?.date || now),
          timeEnd: event.end?.dateTime
            ? new Date(event.end.dateTime)
            : new Date(event.end?.date || now),
          location: event.location || '',
          status: EventStatus.UPCOMING,
          type: EventType.ONLINE,
          capacity: 100,
        });
      }

      const attendanceExisting =
        await this.attendanceService.findByUserAndEvent(userId, eventEntity.id);

      if (!attendanceExisting) {
        await this.attendanceService.register(userId, {
          eventId: eventEntity.id,
        });
      }

      results.push(eventEntity);
    }

    return Event.fromEntities(results);
  }
}
