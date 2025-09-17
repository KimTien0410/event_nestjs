import { EntityManager } from "typeorm";
import { Event } from "./domain/event";

export interface IEventRegistrationService {
    /** 
     * Get the event details for registration.
     */

    getEventForRegistration(eventId: number, manager?: EntityManager): Promise<Event>;

    /**
     * Get the current count of attendants for the event.
     */
    getCurrentAttendantCount(eventId: number, manager?: EntityManager): Promise<number>;

    /**
     * Check if the event is open for registration.
     */
    isEventRegistrable(eventId: number, manager?: EntityManager): Promise<boolean>;

}