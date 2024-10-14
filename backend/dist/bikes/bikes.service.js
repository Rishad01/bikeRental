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
exports.BikesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bikes_entity_1 = require("./bikes.entity");
const reservation_entity_1 = require("../reservations/reservation.entity");
let BikesService = class BikesService {
    constructor(bikesRepository, reservationRepository) {
        this.bikesRepository = bikesRepository;
        this.reservationRepository = reservationRepository;
    }
    async findReservationsByBikeId(bikeId) {
        const bike = await this.bikesRepository.findOne({
            where: { id: bikeId },
            relations: ["reservations"],
        });
        if (!bike) {
            throw new Error("Bike not found");
        }
        return bike.reservations;
    }
    async create(createBikeDto) {
        const bike = this.bikesRepository.create(createBikeDto);
        return await this.bikesRepository.save(bike);
    }
    async findAll() {
        return await this.bikesRepository.find();
    }
    async findOne(id) {
        return await this.bikesRepository.findOne({ where: { id } });
    }
    async update(id, updateBikeDto) {
        await this.bikesRepository.update(id, updateBikeDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.bikesRepository.delete(id);
    }
    async findFilteredBikesWithoutJoin(filters, page, limit, userRole) {
        const { color, model, fromDate, toDate } = filters;
        const where = {};
        if (color)
            where.color = color;
        if (model)
            where.model = model;
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
            if (!from || !to)
                return true;
            const hasConflictingReservation = bike.reservations.some((reservation) => {
                const start = new Date(reservation.startDate);
                const end = new Date(reservation.endDate);
                return (start >= from && start <= to) || (end >= from && end <= to);
            });
            if (userRole === "user") {
                return (!hasConflictingReservation ||
                    bike.reservations.every((reservation) => reservation.status === "cancelled"));
            }
            return !hasConflictingReservation;
        });
        return {
            bikes: filteredBikes,
            totalPages: Math.ceil(total / limit),
        };
    }
};
exports.BikesService = BikesService;
exports.BikesService = BikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bikes_entity_1.Bike)),
    __param(1, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BikesService);
//# sourceMappingURL=bikes.service.js.map