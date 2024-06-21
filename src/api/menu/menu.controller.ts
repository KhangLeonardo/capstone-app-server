import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/create-menu.dto';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    const menuData = {
      ...createMenuDto,
      startTime: new Date(createMenuDto.startTime),
      endTime: new Date(createMenuDto.endTime),
    };
    return this.menuService.create(menuData);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    const menuData = {
      ...updateMenuDto,
      startTime: updateMenuDto.startTime
        ? new Date(updateMenuDto.startTime)
        : undefined,
      endTime: updateMenuDto.endTime
        ? new Date(updateMenuDto.endTime)
        : undefined,
    };
    return this.menuService.update(+id, menuData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
