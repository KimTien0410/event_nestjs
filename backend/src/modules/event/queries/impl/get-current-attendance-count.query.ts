import { Uuid } from 'src/common/types';

export class GetCurrentAttendantCountQuery {
  constructor(public readonly eventId: Uuid) {}
}
