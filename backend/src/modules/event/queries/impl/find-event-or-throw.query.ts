import { Uuid } from 'src/common/types';

export class FindEventOrThrowQuery {
  constructor(public readonly eventId: Uuid) {}
}
