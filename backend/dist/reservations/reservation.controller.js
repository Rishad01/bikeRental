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
exports.ReservationsController = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("./reservation.service");
const create_reservation_dto_1 = require("./dto/create-reservation.dto");
const roles_decorator_1 = require("../common/roles.decorator");
const role_enum_1 = require("../common/role.enum");
const get_user_decorator_1 = require("../common/get-user.decorator");
const users_entity_1 = require("../users/users.entity");
const bikes_service_1 = require("../bikes/bikes.service");
const auth_role_guard_1 = require("../auth/auth-role.guard");
let ReservationsController = class ReservationsController {
    constructor(reservationsService, bikesService) {
        this.reservationsService = reservationsService;
        this.bikesService = bikesService;
    }
    async findUserReservations(user) {
        console.log(user);
        return this.reservationsService.findUserReservations(user.id);
    }
    async create(bikeId, createReservationDto, user) {
        console.log(user.role);
        const bike = await this.bikesService.findOne(bikeId);
        return this.reservationsService.create(createReservationDto, user, bike);
    }
    findAll() {
        return this.reservationsService.findAll();
    }
    async cancelReservation(reservationId, user) {
        return this.reservationsService.cancelReservation(reservationId, user);
    }
};
exports.ReservationsController = ReservationsController;
__decorate([
    (0, common_1.UseGuards)(auth_role_guard_1.AuthRoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    (0, common_1.Get)("/user"),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "findUserReservations", null);
__decorate([
    (0, common_1.UseGuards)(auth_role_guard_1.AuthRoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    (0, common_1.Post)(":bikeId"),
    __param(0, (0, common_1.Param)("bikeId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_reservation_dto_1.CreateReservationDto,
        users_entity_1.User]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_role_guard_1.AuthRoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    (0, common_1.Delete)(":reservationId/cancel"),
    __param(0, (0, common_1.Param)("reservationId")),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, users_entity_1.User]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "cancelReservation", null);
exports.ReservationsController = ReservationsController = __decorate([
    (0, common_1.Controller)("reservations"),
    __metadata("design:paramtypes", [reservation_service_1.ReservationsService,
        bikes_service_1.BikesService])
], ReservationsController);
//# sourceMappingURL=reservation.controller.js.map