import {
  Param,
  Body,
  Put,
  Controller,
  Get,
  UseGuards,
  Request,
  ParseIntPipe,
} from "@nestjs/common";
import { AuthRoleGuard } from "../auth/auth-role.guard";
import { Roles } from "../common/roles.decorator";
import { Role } from "../common/role.enum";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthRoleGuard)
  @Roles(Role.Manager)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Put(":id/promote")
  @Roles(Role.Manager)
  async promoteToManager(@Param("id", ParseIntPipe) id: number) {
    return this.userService.promoteToManager(id);
  }

  @Put(":id")
  @Roles(Role.Manager)
  async updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
