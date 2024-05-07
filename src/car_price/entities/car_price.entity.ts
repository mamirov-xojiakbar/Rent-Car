import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ICarPriceCreationAttr {
  per_hour: number;
  per_day: number;
  per_month: number;
}

@Table({ tableName: 'car_price' })
export class CarPrice extends Model<CarPrice, ICarPriceCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier for the car-price',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 10,
    description: 'The price per hour for the car',
  })
  @Column({
    type: DataType.FLOAT,
  })
  per_hour: number;

  @ApiProperty({
    example: 50,
    description: 'The price per day for the car',
  })
  @Column({
    type: DataType.FLOAT,
  })
  per_day: number;

  @ApiProperty({
    example: 500,
    description: 'The price per month for the car',
  })
  @Column({
    type: DataType.FLOAT,
  })
  per_month: number;
}
