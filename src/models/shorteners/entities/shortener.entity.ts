import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Shortener {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 500 })
  url: string;

  @Column({ length: 20, unique: true })
  hash: string;

  @CreateDateColumn()
  created_at: Date;

  get expired(): boolean {
    const today = new Date();
    const difference = today.getTime() - this.created_at.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days > 7;
  }
}
