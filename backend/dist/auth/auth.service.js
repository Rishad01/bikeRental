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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const role_enum_1 = require("../common/role.enum");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signup(email, password) {
        const managerExists = await this.usersService.doesManagerExist();
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = managerExists ? role_enum_1.Role.User : role_enum_1.Role.Manager;
        const user = await this.usersService.createUser(email, hashedPassword, role);
        const payload = { email: user.email, role: user.role, id: user.id };
        const token = this.jwtService.sign(payload);
        return { user, token };
    }
    async login(email, password) {
        try {
            const user = await this.usersService.findUserByEmail(email);
            if (!user) {
                throw new common_1.UnauthorizedException("User with this email does not exist.");
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException("Incorrect password. Please try again.");
            }
            const payload = { email: user.email, role: user.role, id: user.id };
            const token = this.jwtService.sign(payload);
            const { password: _, ...userWithoutPassword } = user;
            return { user: userWithoutPassword, token };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException("An error occurred while processing the login request.");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map