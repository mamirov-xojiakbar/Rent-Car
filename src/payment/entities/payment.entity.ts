import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/order/entities/order.entity';

interface IPaymentCreationAttr {
  orderId: number;
  method: string;
  amount: number;
  date: string;
}

@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier for the payment',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the Order associated with the payment',
  })
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId: number;

  @ApiProperty({ example: 100.5, description: 'The amount of the payment' })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;

  @ApiProperty({
    example: '2024-04-10',
    description: 'The date of the payment',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: string;

  @ApiProperty({ example: 'Credit Card', description: 'The payment method' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  method: string;

  @ApiProperty({
    example: 'Payment for services rendered',
    description: 'Description of the payment',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @BelongsTo(() => Order)
  order: Order;
}
