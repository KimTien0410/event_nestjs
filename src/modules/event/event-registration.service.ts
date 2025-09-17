import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { EventEntity } from "./entities/event.entity";
import { Event } from "./domain/event";
import { AttendanceStatus } from "../attendance/domain/attendance-status";
import { EventStatus } from "./domain/event-status";

@Injectable()
export class EventRegistrationService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async getEventForRegistration(eventId: number, manager?: EntityManager): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new BadRequestException('Event not found');
    }

    return Event.fromEntity(event);
  }

  async getCurrentAttendantCount(eventId: number): Promise<number> {

    return this.eventRepository.count({
      where: {
        id: eventId,
        attendances: { status: AttendanceStatus.REGISTERED }
      },
      relations: ['attendances']
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