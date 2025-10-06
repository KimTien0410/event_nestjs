import { Uuid } from "src/common/types";

export class GetEventsByUserQuery{
    constructor(public readonly userId: Uuid){}
}