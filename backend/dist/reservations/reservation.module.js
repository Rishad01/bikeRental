"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservation_controller_1 = require("./reservation.controller");
const reservation_service_1 = require("./reservation.service");
const reservation_entity_1 = require("./reservation.entity");
const bikes_entity_1 = require("../bikes/bikes.entity");
const users_entity_1 = require("../users/users.entity");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("../auth/auth.module");
const bikes_module_1 = require("../bikes/bikes.module");
let ReservationsModule = class ReservationsModule {
};
exports.ReservationsModule = ReservationsModule;
exports.ReservationsModule = ReservationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([reservation_entity_1.Reservation, bikes_entity_1.Bike, users_entity_1.User]),
            auth_module_1.AuthModule,
            (0, common_1.forwardRef)(() => bikes_module_1.BikesModule),
        ],
        controllers: [reservation_controller_1.ReservationsController],
        providers: [reservation_service_1.ReservationsService, jwt_1.JwtService],
        exports: [reservation_service_1.ReservationsService],
    })
], ReservationsModule);
//# sourceMappingURL=reservation.module.js.map