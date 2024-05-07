import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Payment } from './entities/payment.entity';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Create a new payment' })
  @ApiCreatedResponse({
    description: 'The payment has been successfully created',
    type: Payment,
  })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: 'Get all payments' })
  @ApiOkResponse({ description: 'List of all payments', type: [Payment] })
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({ summary: 'Get a payment by ID' })
  @ApiOkResponse({
    description: 'The payment has been successfully found',
    type: Payment,
  })
  @ApiNotFoundResponse({ description: 'Payment not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a payment by ID' })
  @ApiOkResponse({
    description: 'The payment has been successfully updated',
    type: Payment,
  })
  @ApiNotFoundResponse({ description: 'Payment not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiOkResponse({ description: 'The payment has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Payment not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
