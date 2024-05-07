import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CarPrice } from 'src/car_price/entities/car_price.entity';
import { Models } from 'src/model/entities/model.entity';

interface ICarCreationAttr {
  number: string;
  modelId: number;
  color: string;
  year: string;
  priceId: number;
}

@Table({ tableName: 'cars' })
export class Car extends Model<Car, ICarCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier for the car',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'ABC123',
    description: 'The number plate of the car',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  number: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the car model',
  })
  @ForeignKey(() => Models)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  modelId: number;

  @ApiProperty({
    example: 'Red',
    description: 'The color of the car',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @ApiProperty({
    example: '2022',
    description: 'The manufacturing year of the car',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  year: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the car price',
  })
  @ForeignKey(() => CarPrice)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  priceId: number;

  @BelongsTo(() => Models)
  model: Models;

  @BelongsTo(() => CarPrice)
  price: CarPrice;
}
