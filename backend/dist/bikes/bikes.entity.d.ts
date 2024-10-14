import { Reservation } from '../reservations/reservation.entity';
export declare class Bike {
    id: number;
    model: string;
    color: string;
    location: string;
    avgRating: number;
    reservations: Reservation[];
}
