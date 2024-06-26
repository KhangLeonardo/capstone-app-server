import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { School } from './school.entity';
import { Image } from './image.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';
import { ToggleLike } from './toggle-like.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ nullable: false })
  school_id: number;

  @ManyToOne(() => School, (school) => school.posts)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column({ nullable: false })
  created_by: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'created_by' })
  user: User;

  @OneToMany(() => Image, (image) => image.post)
  images: Image[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => ToggleLike, (toggleLike) => toggleLike.post)
  likes: ToggleLike[];

  @Column({ nullable: false })
  status: string;

  @CreateDateColumn({ type: 'timestamptz' })
  published_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
