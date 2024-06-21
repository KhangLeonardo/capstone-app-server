import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Menu } from './menu.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mealName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  nutritionInfo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Menu, (menu) => menu.meals, { onDelete: 'CASCADE' })
  menu: Menu;
}
