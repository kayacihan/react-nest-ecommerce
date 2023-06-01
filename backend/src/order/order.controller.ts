import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@app/user/decorators/user.decorator';
import { AdminGuard } from '@app/user/guards/admin.guard';
import { AuthGuard } from '@app/user/guards/auth.guard';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('list')
  @UseGuards(AuthGuard)
  async findAllByUserId(@User('id') currentUserId: number) {
    return this.orderService.findAllByUserId(currentUserId);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body('order') createOrderDto: CreateOrderDto,
    @User('id') currentUserId: number,
  ) {
    return this.orderService.create(currentUserId, createOrderDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, AdminGuard)
  async update(
    @Param('id') id: string,
    @Body('order') updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  async remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
