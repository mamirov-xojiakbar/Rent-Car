import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Car } from 'src/cars/entities/car.entity';

interface ICarPhotoCreationAttr {
  carId: number;
  link: string;
}

@Table({ tableName: 'car_photo' })
export class CarPhoto extends Model<CarPhoto, ICarPhotoCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier for the car-photo',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '1',
    description: 'The ID of the car associated with this photo',
  })
  @ForeignKey(() => Car)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  carId: number;

  @ApiProperty({
    example: 'link',
    description: 'The link of the car',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  link: string;

  @BelongsTo(() => Car)
  car: Car;
}
