import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { CategoryDto } from './categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CategoryDto) {
    return this.categories.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.categories.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getByName(@Query('name') name: string) {
    if (name) {
      return this.categories.getByName(name);
    } else {
      return this.categories.getAll();
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param() id: string) {
    return this.categories.getById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: CategoryDto) {
    return this.categories.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categories.delete(id);
  }
}
