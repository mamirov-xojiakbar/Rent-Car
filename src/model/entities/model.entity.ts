import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Marka } from 'src/marka/entities/marka.entity';

interface IModelCreationAttr {
  name: string;
  markaId: number;
}

@Table({ tableName: 'model' })
export class Models extends Model<Models, IModelCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier for the model',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Corolla',
    description: 'The name of the car model',
  })
  @Column({ type: DataType.STRING })
  name: string;

  @ForeignKey(() => Marka)
  @Column({ type: DataType.INTEGER})
  markaId: number;

  @BelongsTo(() => Marka)
  marka: Marka;
}
