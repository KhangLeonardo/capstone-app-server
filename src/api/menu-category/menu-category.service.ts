import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuCategory } from '../../common/entities/menu-category.entity';
import {
  CreateMenuCategoryDto,
  UpdateMenuCategoryDto,
} from './dto/create-menu-category.dto';

@Injectable()
export class MenuCategoryService {
  constructor(
    @InjectRepository(MenuCategory)
    private menuCategoryRepository: Repository<MenuCategory>,
  ) {}

  create(createMenuCategoryDto: CreateMenuCategoryDto) {
    const menuCategory = this.menuCategoryRepository.create(
      createMenuCategoryDto,
    );
    return this.menuCategoryRepository.save(menuCategory);
  }

  findAll() {
    return this.menuCategoryRepository.find();
  }

  findOne(id: number) {
    return this.menuCategoryRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateMenuCategoryDto: UpdateMenuCategoryDto) {
    return this.menuCategoryRepository.update(id, updateMenuCategoryDto);
  }

  remove(id: number) {
    return this.menuCategoryRepository.delete(id);
  }
}
