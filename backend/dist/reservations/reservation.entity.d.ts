import { User } from "../users/users.entity";
import { Bike } from "../bikes/bikes.entity";
export declare class Reservation {
    id: number;
    user: User;
    bike: Bike;
    startDate: Date;
    endDate: Date;
    status: "active" | "cancelled";
    review: string;
    rating: number | null;
}
