import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { User } from '../users/users.entity';
import { Bike } from '../bikes/bikes.entity';
export declare class ReservationsService {
    private reservationsRepository;
    constructor(reservationsRepository: Repository<Reservation>);
    create(createReservationDto: CreateReservationDto, user: User, bike: Bike): Promise<Reservation>;
    findUserReservations(userId: number): Promise<Reservation[]>;
    findAll(): Promise<Reservation[]>;
    cancelReservation(reservationId: number, user: User): Promise<Reservation>;
}
