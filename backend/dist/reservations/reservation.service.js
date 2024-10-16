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
let ReservationsService = class ReservationsService {
    constructor(reservationsRepository) {
        this.reservationsRepository = reservationsRepository;
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
        return await this.reservationsRepository.find();
    }
    async cancelReservation(reservationId, user) {
        const reservation = await this.reservationsRepository.findOne({
            where: { id: reservationId },
            relations: ["user"],
        });
        if (!reservation) {
            throw new common_1.NotFoundException("Reservation not found");
        }
        if (reservation.user.id !== user.id) {
            throw new common_1.ForbiddenException("You are not allowed to delete this reservation");
        }
        await this.reservationsRepository.remove(reservation);
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReservationsService);
//# sourceMappingURL=reservation.service.js.map