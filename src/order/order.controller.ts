import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @ApiCreatedResponse({
    description: 'The order has been successfully created',
    type: Order,
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiOkResponse({ description: 'List of all orders', type: [Order] })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiOkResponse({
    description: 'The order has been successfully found',
    type: Order,
  })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiOkResponse({
    description: 'The order has been successfully updated',
    type: Order,
  })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiOkResponse({ description: 'The order has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
