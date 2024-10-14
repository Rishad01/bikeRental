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
exports.BikesController = void 0;
const common_1 = require("@nestjs/common");
const bikes_service_1 = require("./bikes.service");
const create_bike_dto_1 = require("./dto/create-bike.dto");
const auth_role_guard_1 = require("../auth/auth-role.guard");
const get_user_decorator_1 = require("../common/get-user.decorator");
const users_entity_1 = require("../users/users.entity");
let BikesController = class BikesController {
    constructor(bikesService) {
        this.bikesService = bikesService;
    }
    async getReservationsByBikeId(id) {
        return await this.bikesService.findReservationsByBikeId(id);
    }
    async findFilteredBikes(user, color, model, fromDate, toDate, page = 1, limit = 10) {
        const userRole = user.role;
        const filters = { color, model, fromDate, toDate };
        console.log(filters);
        return this.bikesService.findFilteredBikesWithoutJoin(filters, page, limit, userRole);
    }
    create(createBikeDto) {
        return this.bikesService.create(createBikeDto);
    }
    findAll() {
        return this.bikesService.findAll();
    }
    findOne(id) {
        return this.bikesService.findOne(id);
    }
    update(id, updateBikeDto) {
        return this.bikesService.update(id, updateBikeDto);
    }
    remove(id) {
        return this.bikesService.remove(id);
    }
};
exports.BikesController = BikesController;
__decorate([
    (0, common_1.Get)(':id/reservations'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "getReservationsByBikeId", null);
__decorate([
    (0, common_1.UseGuards)(auth_role_guard_1.AuthRoleGuard),
    (0, common_1.Get)('search'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('color')),
    __param(2, (0, common_1.Query)('model')),
    __param(3, (0, common_1.Query)('fromDate')),
    __param(4, (0, common_1.Query)('toDate')),
    __param(5, (0, common_1.Query)('page')),
    __param(6, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User, String, String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "findFilteredBikes", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bike_dto_1.CreateBikeDto]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "remove", null);
exports.BikesController = BikesController = __decorate([
    (0, common_1.Controller)('bikes'),
    __metadata("design:paramtypes", [bikes_service_1.BikesService])
], BikesController);
//# sourceMappingURL=bikes.controller.js.map