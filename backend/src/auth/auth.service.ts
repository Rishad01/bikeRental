import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";
import { Role } from "../common/role.enum";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signup(email: string, password: string): Promise<any> {
    const managerExists = await this.usersService.doesManagerExist();

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = managerExists ? Role.User : Role.Manager;

    const user = await this.usersService.createUser(
      email,
      hashedPassword,
      role
    );

    // Generate JWT token
    const payload = { email: user.email, role: user.role, id: user.id };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findUserByEmail(email);

      if (!user) {
        throw new UnauthorizedException("User with this email does not exist.");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(
          "Incorrect password. Please try again."
        );
      }

      const payload = { email: user.email, role: user.role, id: user.id };
      const token = this.jwtService.sign(payload);

      const { password: _, ...userWithoutPassword } = user;

      return { user: userWithoutPassword, token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException(
        "An error occurred while processing the login request."
      );
    }
  }
}
