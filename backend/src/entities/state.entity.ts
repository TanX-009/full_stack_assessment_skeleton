import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('state')
export class State {
  @PrimaryGeneratedColumn()
  state_id: number;

  @Column({ unique: true })
  state_name: string;
}
