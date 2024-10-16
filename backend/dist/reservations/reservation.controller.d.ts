import { ReservationsService } from "./reservation.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { Reservation } from "./reservation.entity";
import { User } from "src/users/users.entity";
import { BikesService } from "src/bikes/bikes.service";
export declare class ReservationsController {
    private readonly reservationsService;
    private readonly bikesService;
    constructor(reservationsService: ReservationsService, bikesService: BikesService);
    findUserReservations(user: User): Promise<Reservation[]>;
    create(bikeId: number, createReservationDto: CreateReservationDto, user: User): Promise<Reservation>;
    findAll(): Promise<Reservation[]>;
    cancelReservation(reservationId: number, user: User): Promise<any>;
}
