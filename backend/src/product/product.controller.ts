import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { AdminGuard } from '@app/user/guards/admin.guard';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  @UseGuards(AuthGuard)
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  async create(@Body('product') createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, AdminGuard)
  async update(
    @Param('id') id: string,
    @Body('product') updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
