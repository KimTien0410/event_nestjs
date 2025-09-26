import type {Uuid} from '../common/types';

export const emptyUuid = '00000000-0000-0000-0000-000000000000' as Uuid;

export function isNullUuid(uuid: Uuid | null | undefined): boolean {
    if (!uuid) {
        return true;
    }

    return uuid === emptyUuid;
}

export function validUUid(uuid?: string | null) {

    if (!uuid) {
        return false;
    }
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
}
