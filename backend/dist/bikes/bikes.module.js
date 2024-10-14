"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bikes_controller_1 = require("./bikes.controller");
const bikes_service_1 = require("./bikes.service");
const bikes_entity_1 = require("./bikes.entity");
const reservation_entity_1 = require("../reservations/reservation.entity");
const auth_module_1 = require("../auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const reservation_module_1 = require("../reservations/reservation.module");
let BikesModule = class BikesModule {
};
exports.BikesModule = BikesModule;
exports.BikesModule = BikesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([bikes_entity_1.Bike, reservation_entity_1.Reservation]),
            auth_module_1.AuthModule,
            (0, common_1.forwardRef)(() => reservation_module_1.ReservationsModule),
        ],
        controllers: [bikes_controller_1.BikesController],
        providers: [bikes_service_1.BikesService, jwt_1.JwtService],
        exports: [bikes_service_1.BikesService],
    })
], BikesModule);
//# sourceMappingURL=bikes.module.js.map