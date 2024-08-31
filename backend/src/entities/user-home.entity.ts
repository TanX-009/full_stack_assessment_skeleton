import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Home } from './home.entity';

@Entity('user_home')
export class UserHome {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  user: User;

  @ManyToOne(() => Home)
  @JoinColumn({ name: 'home' })
  home: Home;
}
