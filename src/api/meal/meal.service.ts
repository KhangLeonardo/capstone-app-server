import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from '../../common/entities/meal.entity';
import { CreateMealDto, UpdateMealDto } from './dto/create-meal.dto';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
  ) {}

  create(createMealDto: CreateMealDto) {
    const meal = this.mealRepository.create(createMealDto);
    return this.mealRepository.save(meal);
  }

  findAll() {
    return this.mealRepository.find();
  }

  findOne(id: number) {
    return this.mealRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateMealDto: UpdateMealDto) {
    return this.mealRepository.update(id, updateMealDto);
  }

  remove(id: number) {
    return this.mealRepository.delete(id);
  }
}
