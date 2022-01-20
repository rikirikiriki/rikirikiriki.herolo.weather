import {Location} from '../interfaces/location.interface';

export interface StoredLocation {
    locationPrefix: string;
    locations: Location[];
}