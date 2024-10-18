"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservation_entity_1 = require("./reservation.entity");
const bikes_service_1 = require("../bikes/bikes.service");
let ReservationsService = class ReservationsService {
    constructor(reservationsRepository, bikeService) {
        this.reservationsRepository = reservationsRepository;
        this.bikeService = bikeService;
    }
    async create(createReservationDto, user, bike) {
        const reservation = this.reservationsRepository.create({
            ...createReservationDto,
            user,
            bike,
            status: "active",
        });
        return await this.reservationsRepository.save(reservation);
    }
    async findUserReservations(userId) {
        return await this.reservationsRepository.find({
            where: { user: { id: userId } },
            relations: ["bike", "user"],
        });
    }
    async findAll() {
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
    async cancelReservation(reservationId, user) {
        console.log(reservationId);
        const reservation = await this.reservationsRepository.findOne({
            where: { id: reservationId },
            relations: ["user", "bike"],
        });
        console.log(reservation);
        if (!reservation) {
            throw new common_1.NotFoundException("Reservation not found");
        }
        console.log(user.id);
        if (user.role === "manager") {
            await this.reservationsRepository.remove(reservation);
            await this.bikeService.updateBikeRating(reservation.bike.id);
            return;
        }
        if (reservation.user.id !== user.id) {
            throw new common_1.ForbiddenException("You are not allowed to cancel this reservation");
        }
        console.log(reservation);
        await this.reservationsRepository.remove(reservation);
        await this.bikeService.updateBikeRating(reservation.bike.id);
    }
    async rateReservation(reservationId, rating, user) {
        const reservation = await this.reservationsRepository.findOne({
            where: { id: reservationId },
            relations: ["user", "bike"],
        });
        if (!reservation) {
            throw new common_1.NotFoundException("Reservation not found");
        }
        if (rating < 1 || rating > 5) {
            throw new common_1.BadRequestException("Rating must be between 1.0 and 5.0");
        }
        if (reservation.user.id !== user.id) {
            throw new common_1.ForbiddenException("You are not allowed to rate this reservation");
        }
        if (reservation.rating !== null) {
            throw new common_1.BadRequestException("You have already rated this reservation");
        }
        reservation.rating = rating;
        await this.reservationsRepository.save(reservation);
        await this.bikeService.updateBikeRating(reservation.bike.id);
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        bikes_service_1.BikesService])
], ReservationsService);
//# sourceMappingURL=reservation.service.js.map