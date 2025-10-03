import { GoogleCalendarImport } from './domain/google-calendar-import';
import { AttendanceService } from './../attendance/attendance.service';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { EventService } from '../event/event.service';
import { Uuid } from 'src/common/types';
import { EventType } from '../event/domain/event-type';
import { EventStatus } from '../event/domain/event-status';
import { Event } from '../event/domain/event';
import { EventEntity } from '../event/entities/event.entity';
import { chunkArray } from 'src/utils/chunk-array.utils';

@Injectable()
export class GoogleCalendarService {
  constructor(
    private readonly eventService: EventService,
    private readonly attendanceService: AttendanceService,
  ) {}

  async importCalendarBatch(
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

    const calendarBatches = chunkArray(calendars, 3);

    const allResults: EventEntity[] = [];

    for (const batch of calendarBatches) {
      const batchEventsNested = await Promise.all(
        batch.map(async (cal) => {
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

            return Promise.all(
              events.map(async (event) => {
                if (!event.id) return null;

                let eventEntity = await this.eventService.findByGoogleEventId(
                  event.id,
                );

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
          } catch (error) {
            console.error(`Error fetching calendar ${cal.id}:`, error.message);
            return [];
          }
        }),
      );

      const batchResults = batchEventsNested
        .flat(2)
        .filter((e): e is EventEntity => e !== null);

      allResults.push(...batchResults);

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    return Event.fromEntities(allResults);
  }
}
