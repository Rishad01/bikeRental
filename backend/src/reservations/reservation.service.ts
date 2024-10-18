import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reservation } from "./reservation.entity";
import {
  CreateReservationDto,
  //RateReservationDto,
} from "./dto/create-reservation.dto";
import { User } from "../users/users.entity";
import { Bike } from "../bikes/bikes.entity";
import { BikesService } from "src/bikes/bikes.service";

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
    private readonly bikeService: BikesService
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    user: User,
    bike: Bike
  ): Promise<Reservation> {
    const reservation = this.reservationsRepository.create({
      ...createReservationDto,
      user,
      bike,
      status: "active",
    });
    //console.log(reservation);
    return await this.reservationsRepository.save(reservation);
  }

  //   async rateReservation(
  //     id: number,
  //     rateReservationDto: RateReservationDto,
  //   ): Promise<Reservation> {
  //     await this.reservationsRepository.update(id, rateReservationDto);
  //     return this.reservationsRepository.findOne(id);
  //   }

  async findUserReservations(userId: number): Promise<Reservation[]> {
    return await this.reservationsRepository.find({
      where: { user: { id: userId } },
      relations: ["bike", "user"],
    });
  }

  async findAll(): Promise<Reservation[]> {
    return await this.reservationsRepository.find({
      relations: ["bike", "user"],
      select: {
        user: {
          id: true,
          email: true,
          role: true,
        },
      },
    });
  }

  async cancelReservation(reservationId: number, user: User): Promise<void> {
    console.log(reservationId);
    const reservation = await this.reservationsRepository.findOne({
      where: { id: reservationId },
      relations: ["user", "bike"],
    });

    console.log(reservation);

    if (!reservation) {
      throw new NotFoundException("Reservation not found");
    }
    console.log(user.id);
    if (user.role === "manager") {
      await this.reservationsRepository.remove(reservation);
      await this.bikeService.updateBikeRating(reservation.bike.id);
      return;
    }

    if (reservation.user.id !== user.id) {
      throw new ForbiddenException(
        "You are not allowed to cancel this reservation"
      );
    }

    console.log(reservation);
    await this.reservationsRepository.remove(reservation);
    await this.bikeService.updateBikeRating(reservation.bike.id);
  }

  async rateReservation(
    reservationId: number,
    rating: number,
    user: User
  ): Promise<void> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id: reservationId },
      relations: ["user", "bike"],
    });

    if (!reservation) {
      throw new NotFoundException("Reservation not found");
    }

    if (rating < 1 || rating > 5) {
      throw new BadRequestException("Rating must be between 1.0 and 5.0");
    }

    if (reservation.user.id !== user.id) {
      throw new ForbiddenException(
        "You are not allowed to rate this reservation"
      );
    }

    if (reservation.rating !== null) {
      throw new BadRequestException("You have already rated this reservation");
    }

    reservation.rating = rating;
    await this.reservationsRepository.save(reservation);

    await this.bikeService.updateBikeRating(reservation.bike.id);
  }
}
