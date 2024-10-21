import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findAll(): Promise<import("./users.entity").User[]>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<import("./users.entity").User>;
    promoteToManager(id: number): Promise<import("./users.entity").User>;
}
