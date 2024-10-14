import { Repository } from 'typeorm';
import { User } from './users.entity';
import { Role } from '../common/role.enum';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    createUser(email: string, password: string, role: Role): Promise<User>;
    findUserByEmail(email: string): Promise<User | undefined>;
    doesManagerExist(): Promise<boolean>;
}
