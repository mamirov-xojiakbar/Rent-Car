import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Car } from 'src/cars/entities/car.entity';

interface ICarLocationCreationAttr {
  carId: number;
  location: string;
  date_time: string;
}

@Table({ tableName: 'car_location' })
export class CarLocation extends Model<CarLocation, ICarLocationCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier for the car-location',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '1',
    description: 'The ID of the car associated with this location',
  })
  @ForeignKey(() => Car)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  carId: number;

  @ApiProperty({
    example: 'New York',
    description: 'The location of the car at a specific date and time',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;

  @ApiProperty({
    example: '2024-05-03T10:30:00Z',
    description: 'The date and time of the car location',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date_time: string;

  @BelongsTo(() => Car)
  car: Car
}
