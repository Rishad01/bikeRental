import { Repository } from "typeorm";
import { Reservation } from "./reservation.entity";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { User } from "../users/users.entity";
import { Bike } from "../bikes/bikes.entity";
import { BikesService } from "src/bikes/bikes.service";
export declare class ReservationsService {
    private reservationsRepository;
    private readonly bikeService;
    constructor(reservationsRepository: Repository<Reservation>, bikeService: BikesService);
    create(createReservationDto: CreateReservationDto, user: User, bike: Bike): Promise<Reservation>;
    findUserReservations(userId: number): Promise<Reservation[]>;
    findAll(): Promise<Reservation[]>;
    cancelReservation(reservationId: number, user: User): Promise<void>;
    rateReservation(reservationId: number, rating: number, user: User): Promise<void>;
}
