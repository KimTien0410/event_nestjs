import { BadRequestException, Injectable } from "@nestjs/common";
import { IEventRegistrationService } from "./i-event-registration.service";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { EventEntity } from "./entities/event.entity";
import { Event } from "./domain/event";
import { AttendanceStatus } from "../attendance/domain/attendance-status";
import { EventStatus } from "./domain/event-status";

@Injectable()
export class EventRegistrationService implements IEventRegistrationService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async getEventForRegistration(eventId: number, manager?: EntityManager): Promise<Event> {
    const repository = manager
      ? manager.getRepository(EventEntity)
      : this.eventRepository;
    const event = await repository.findOne({ where: { id: eventId } });

    if (!event) {
      throw new BadRequestException('Event not found');
    }

    return Event.fromEntity(event);
  }

  async getCurrentAttendantCount(eventId: number, manager?: EntityManager): Promise<number> {
    const repository = manager ? manager.getRepository(EventEntity) : this.eventRepository;

    return repository.count({
      where: {
        id: eventId,
        attendanceEntities: { status: AttendanceStatus.REGISTERED }
      },
      relations: ['attendanceEntities']
    });
  }

  async isEventRegistrable(eventId: number, manager?: EntityManager): Promise<boolean> {
    const repository = manager ? manager.getRepository(EventEntity) : this.eventRepository;
    const event = await repository.findOne({ where: { id: eventId } });

    if (!event) {
      throw new BadRequestException('Event not found');
    }

    return event.status === EventStatus.UPCOMING;
  }
}