import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Home } from '../entities/home.entity';
import { UserHome } from 'src/entities/user-home.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Home)
    private homeRepository: Repository<Home>,
    @InjectRepository(UserHome)
    private readonly userHomeRepository: Repository<UserHome>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUsersByHome(homeId: number): Promise<User[]> {
    const userHomes = await this.userHomeRepository.find({
      where: { home: { home_id: homeId } },
      relations: ['user'],
    });

    const users = userHomes.map((userHome) => userHome.user);
    return users;
  }
}
