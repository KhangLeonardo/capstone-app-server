import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Menu } from './menu.entity';

@Entity()
export class MenuCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Menu, (menu) => menu.menuCategory)
  menus: Menu[];
}
