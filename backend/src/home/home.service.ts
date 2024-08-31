import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Home } from '../entities/home.entity';
import { UserHome } from '../entities/user-home.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private homeRepository: Repository<Home>,
    @InjectRepository(UserHome)
    private userHomeRepository: Repository<UserHome>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findHomesByUser(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<Home[]> {
    const userHomes = await this.userHomeRepository.find({
      relations: ['home', 'home.state'],
      where: { user: { user_id: userId } },
    });

    const homes = userHomes.map((uh) => uh.home);
    const startIndex = (page - 1) * pageSize;
    const pagenatedHomes = homes.slice(startIndex, startIndex + pageSize);

    return pagenatedHomes;
  }

  async updateUsersForHome(homeId: number, userIds: number[]): Promise<void> {
    // Find the home entity
    const home = await this.homeRepository.findOne({
      where: { home_id: homeId },
    });
    if (!home) throw new Error('Home not found');

    // Find current UserHome associations for this home
    const currentAssociations = await this.userHomeRepository.find({
      where: { home: { home_id: homeId } },
      relations: ['user'],
    });

    // Extract current user IDs associated with this home
    const currentUserIds = currentAssociations.map((uh) => uh.user.user_id);

    // Find users to add (those in userIds but not in currentUserIds)
    const usersToAdd = userIds.filter((id) => !currentUserIds.includes(id));

    // Find users to remove (those in currentUserIds but not in userIds)
    const usersToRemove = currentUserIds.filter((id) => !userIds.includes(id));

    // Remove users
    if (usersToRemove.length > 0) {
      await this.userHomeRepository.delete({
        home: { home_id: homeId },
        user: { user_id: In(usersToRemove) },
      });
    }

    // Add new users
    if (usersToAdd.length > 0) {
      const newUserHomes = usersToAdd.map((userId) => {
        const userHome = new UserHome();
        userHome.home = home;
        userHome.user = { user_id: userId } as User;
        return userHome;
      });
      await this.userHomeRepository.save(newUserHomes);
    }
  }
}
