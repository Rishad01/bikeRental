import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Patch,
  Delete,
} from "@nestjs/common";
import { ReservationsService } from "./reservation.service";
import {
  CreateReservationDto,
  //RateReservationDto,
} from "./dto/create-reservation.dto";
import { Reservation } from "./reservation.entity";
import { Roles } from "src/common/roles.decorator";
import { Role } from "src/common/role.enum";
import { GetUser } from "src/common/get-user.decorator";
import { User } from "src/users/users.entity";
import { BikesService } from "src/bikes/bikes.service";
import { AuthRoleGuard } from "src/auth/auth-role.guard";

@Controller("reservations")
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly bikesService: BikesService
  ) {}

  @UseGuards(AuthRoleGuard)
  @Roles(Role.User)
  @Get("/user")
  async findUserReservations(@GetUser() user: User): Promise<Reservation[]> {
    console.log(user);
    return this.reservationsService.findUserReservations(user.id);
  }

  @UseGuards(AuthRoleGuard)
  @Roles(Role.User)
  @Post(":id/rate")
  async rateReservation(
    @Param("id") reservationId: number,
    @Body("rating") rating: number,
    @GetUser() user: User
  ) {
    await this.reservationsService.rateReservation(reservationId, rating, user);
  }

  @UseGuards(AuthRoleGuard)
  @Roles(Role.User)
  @Post(":bikeId")
  async create(
    @Param("bikeId") bikeId: number,
    @Body() createReservationDto: CreateReservationDto,
    @GetUser() user: User
  ): Promise<Reservation> {
    console.log(user.role);
    const bike = await this.bikesService.findOne(bikeId);
    return this.reservationsService.create(createReservationDto, user, bike);
  }

  @Get()
  findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @UseGuards(AuthRoleGuard)
  @Roles(Role.Manager, Role.User)
  @Delete(":reservationId/cancel")
  async cancelReservation(
    @Param("reservationId") reservationId: number,
    @GetUser() user: User
  ): Promise<any> {
    //console.log(user);
    return this.reservationsService.cancelReservation(reservationId, user);
  }
}
