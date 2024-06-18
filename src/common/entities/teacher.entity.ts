import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Gender } from '../enum/gender_t.enum';
  import { Class } from '../entities/class.entity';
  
  @Entity()
  export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    givenName: string;
  
    @Column()
    surname: string;
  
    @Column({ nullable: true })
    age: number;
  
    @Column({ type: 'enum', enum: Gender })
    gender: Gender;
  
    @Column({ nullable: true })
    address: string;
  
    @Column({ nullable: true })
    phone: string;
  
    @Column()
    dateOfBirth: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @OneToMany(() => Class, classEntity => classEntity.teacher)
    classes: Class[];
  }
  