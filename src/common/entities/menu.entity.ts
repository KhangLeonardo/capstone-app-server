import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { MenuCategory } from '../entities/menu-category.entity';
  import { Meal } from '../entities/meal.entity';
  
  @Entity()
  export class Menu {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    timeRange: string;
  
    @Column({ nullable: true })
    description: string;
  
    @Column({ nullable: true })
    nutritionInfo: string;
  
    @Column()
    startTime: Date;
  
    @Column()
    endTime: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @ManyToOne(() => MenuCategory, menuCategory => menuCategory.menus)
    menuCategory: MenuCategory;
  
    @OneToMany(() => Meal, meal => meal.menu)
    meals: Meal[];
  }
  