import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { Role } from "../common/role.enum";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createUser(email: string, password: string, role: Role): Promise<User> {
    const newUser = this.usersRepository.create({ email, password, role });
    return this.usersRepository.save(newUser);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async doesManagerExist(): Promise<boolean> {
    const manager = await this.usersRepository.findOne({
      where: { role: Role.Manager },
    });
    return !!manager;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async promoteToManager(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.role === Role.Manager) {
      throw new BadRequestException("User is already a manager");
    }

    user.role = Role.Manager;
    return this.usersRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }
}
