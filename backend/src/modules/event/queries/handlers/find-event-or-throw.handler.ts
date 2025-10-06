import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindEventOrThrowQuery } from '../impl/find-event-or-throw.query';

import { NotFoundException } from '@nestjs/common';
import { EventEntity } from '../../entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(FindEventOrThrowQuery)
export class FindEventOrThrowHandler
  implements IQueryHandler<FindEventOrThrowQuery>
{
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async execute(query: FindEventOrThrowQuery): Promise<EventEntity> {
    const { eventId } = query;
    const eventEntity = await this.eventRepository.findOneBy({ id: eventId });

    if (!eventEntity) {
      throw new NotFoundException(`Event with Id ${eventId} not found`);
    }

    return eventEntity;
  }
}
