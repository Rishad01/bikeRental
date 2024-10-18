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
    async findAll(page, limit) {
        const [bikes, totalBikes] = await this.bikesRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        const totalPages = Math.ceil(totalBikes / limit);
        return {
            bikes,
            totalPages,
        };
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
        const { color, model, fromDate, toDate, avgRating } = filters;
        console.log(avgRating);
        const where = {};
        if (color)
            where.color = color;
        if (model)
            where.model = model;
        if (avgRating)
            where.avgRating = (0, typeorm_2.MoreThanOrEqual)(avgRating);
        const [bikes, total] = await this.bikesRepository.findAndCount({
            where,
            skip: (page - 1) * limit,
            take: limit,
            relations: ["reservations"],
        });
        console.log(bikes);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;
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
    async updateBikeRating(bikeId) {
        console.log("hello");
        const bike = await this.bikesRepository.findOne({ where: { id: bikeId } });
        if (!bike) {
            throw new common_1.NotFoundException("Bike not found");
        }
        const reservations = await this.reservationRepository.find({
            where: { bike: { id: bikeId }, rating: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) },
        });
        if (reservations.length > 0) {
            const totalRating = reservations.reduce((acc, reservation) => acc + reservation.rating, 0);
            const avgRating = totalRating / reservations.length;
            bike.avgRating = parseFloat(avgRating.toFixed(1));
            await this.bikesRepository.save(bike);
        }
        else {
            bike.avgRating = 0;
            await this.bikesRepository.save(bike);
        }
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