import { GoogleCalendarImport } from './domain/google-calendar-import';
import { AttendanceService } from './../attendance/attendance.service';
import { Injectable } from '@nestjs/common';
import { calendar_v3, google } from 'googleapis';
import { EventService } from '../event/event.service';
import { Uuid } from 'src/common/types';
import { EventType } from '../event/domain/event-type';
import { EventStatus } from '../event/domain/event-status';
import { Event } from '../event/domain/event';
import { EventEntity } from '../event/entities/event.entity';
import pLimit from 'p-limit';

@Injectable()
export class GoogleCalendarService {
  constructor(
    private readonly eventService: EventService,
    private readonly attendanceService: AttendanceService,
  ) {}

  async importCalendarWithPLimit(
    userId: Uuid,
    googleCalendarImport: GoogleCalendarImport,
  ): Promise<Event[]> {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: googleCalendarImport.accessToken,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const now = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(now.getFullYear() + 1);
    const resCalendarList = await calendar.calendarList.list();
    const calendars = resCalendarList.data.items || [];
    const limit = pLimit(3);

    const tasks = calendars.map((cal) =>
      limit(async () => {
        if (!cal.id) return [];

        try {
          const eventsRes = await calendar.events.list({
            calendarId: cal.id,
            timeMin: now.toISOString(),
            timeMax: oneYearLater.toISOString(),
            maxResults: 50,
            singleEvents: true,
            orderBy: 'startTime',
          });

          const events = eventsRes.data.items || [];
          const entities = await this.processGoogleEvents(userId, events, now);
          return entities.filter((e) => e !== null);
        } catch (error) {
          console.error(`Error fetching calendar ${cal.id}:`, error.message);
          return [];
        }
      }),
    );

    const results = (await Promise.all(tasks)).flat();
    return Event.fromEntities(results);
  }

  private async processGoogleEvents(
    userId: Uuid,
    events: calendar_v3.Schema$Event[],
    now: Date,
  ): Promise<EventEntity[]> {
    const entities = await Promise.all(
      events.map(async (event) => {
        if (!event.id) return null;

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
          await this.attendanceService.findByUserAndEvent(
            userId,
            eventEntity.id,
          );

        if (!attendanceExisting) {
          await this.attendanceService.register(userId, {
            eventId: eventEntity.id,
          });
        }

        return eventEntity;
      }),
    );

    return entities.filter((e): e is EventEntity => e !== null);
  }
}
