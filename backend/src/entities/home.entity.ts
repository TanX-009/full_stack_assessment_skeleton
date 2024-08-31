import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { State } from './state.entity';

@Entity('home')
export class Home {
  @PrimaryGeneratedColumn()
  home_id: number;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state' })
  state: State;

  @Column()
  street_address: string;

  @Column()
  zip: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sqft: number;

  @Column()
  beds: number;

  @Column()
  baths: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  list_price: number;
}
