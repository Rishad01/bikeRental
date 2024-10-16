import { BikesService } from "./bikes.service";
import { CreateBikeDto } from "./dto/create-bike.dto";
import { Bike } from "./bikes.entity";
import { User } from "src/users/users.entity";
import { Reservation } from "src/reservations/reservation.entity";
export declare class BikesController {
    private readonly bikesService;
    constructor(bikesService: BikesService);
    getReservationsByBikeId(id: number): Promise<Reservation[]>;
    findFilteredBikes(user: User, color?: string, model?: string, fromDate?: string, toDate?: string, page?: number, limit?: number): Promise<{
        bikes: Bike[];
        totalPages: number;
    }>;
    create(createBikeDto: CreateBikeDto): Promise<Bike>;
    findAll(): Promise<Bike[]>;
    findOne(id: number): Promise<Bike>;
    update(id: number, updateBikeDto: Partial<CreateBikeDto>): Promise<Bike>;
    remove(id: number): Promise<void>;
}
