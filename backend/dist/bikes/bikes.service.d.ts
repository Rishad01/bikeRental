import { Repository } from "typeorm";
import { Bike } from "./bikes.entity";
import { CreateBikeDto } from "./dto/create-bike.dto";
import { Reservation } from "../reservations/reservation.entity";
export declare class BikesService {
    private bikesRepository;
    private reservationRepository;
    constructor(bikesRepository: Repository<Bike>, reservationRepository: Repository<Reservation>);
    findReservationsByBikeId(bikeId: number): Promise<Reservation[]>;
    create(createBikeDto: CreateBikeDto): Promise<Bike>;
    findAll(): Promise<Bike[]>;
    findOne(id: number): Promise<Bike>;
    update(id: number, updateBikeDto: Partial<CreateBikeDto>): Promise<Bike>;
    remove(id: number): Promise<void>;
    findFilteredBikesWithoutJoin(filters: any, page: number, limit: number, userRole: string): Promise<{
        bikes: Bike[];
        totalPages: number;
    }>;
}
