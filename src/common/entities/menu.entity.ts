import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { MenuCategory } from './menu-category.entity';
import { Meal } from './meal.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  time_range: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => MenuCategory, (menuCategory) => menuCategory.menus)
  @JoinColumn({ name: 'menu_category_id' }) // Assuming menu_category_id column is used
  menuCategory: MenuCategory;

  @OneToMany(() => Meal, (meal) => meal.menu)
  meals: Meal[];
}
