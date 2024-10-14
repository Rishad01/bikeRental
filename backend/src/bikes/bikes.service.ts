import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bike } from "./bikes.entity";
import { CreateBikeDto } from "./dto/create-bike.dto";
import { Reservation } from "../reservations/reservation.entity";

@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bike)
    private bikesRepository: Repository<Bike>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>
  ) {}

  async findReservationsByBikeId(bikeId: number): Promise<Reservation[]> {
    const bike = await this.bikesRepository.findOne({
      where: { id: bikeId },
      relations: ["reservations"],
    });

    if (!bike) {
      throw new Error("Bike not found");
    }

    return bike.reservations;
  }

  async create(createBikeDto: CreateBikeDto): Promise<Bike> {
    const bike = this.bikesRepository.create(createBikeDto);
    return await this.bikesRepository.save(bike);
  }

  async findAll(): Promise<Bike[]> {
    return await this.bikesRepository.find();
  }

  async findOne(id: number): Promise<Bike> {
    return await this.bikesRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateBikeDto: Partial<CreateBikeDto>
  ): Promise<Bike> {
    await this.bikesRepository.update(id, updateBikeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.bikesRepository.delete(id);
  }

  async findFilteredBikesWithoutJoin(
    filters: any,
    page: number,
    limit: number,
    userRole: string
  ): Promise<{ bikes: Bike[]; totalPages: number }> {
    const { color, model, fromDate, toDate } = filters;

    const where: any = {};
    if (color) where.color = color;
    if (model) where.model = model;

    const [bikes, total] = await this.bikesRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      relations: ["reservations"],
    });

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    console.log(bikes);
    const filteredBikes = bikes.filter((bike) => {
      if (!from || !to) return true;

      const hasConflictingReservation = bike.reservations.some(
        (reservation) => {
          const start = new Date(reservation.startDate);
          const end = new Date(reservation.endDate);
          return (start >= from && start <= to) || (end >= from && end <= to);
        }
      );

      if (userRole === "user") {
        return (
          !hasConflictingReservation ||
          bike.reservations.every(
            (reservation) => reservation.status === "cancelled"
          )
        );
      }

      return !hasConflictingReservation;
    });

    return {
      bikes: filteredBikes,
      totalPages: Math.ceil(total / limit),
    };
  }
}
