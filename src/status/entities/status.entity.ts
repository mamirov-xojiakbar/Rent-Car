import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface IStatusCreationAttr {
  name: string;
}

@Table({ tableName: 'status' })
export class Status extends Model<Status, IStatusCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier for the status',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'chevrolet',
    description: 'The name of the status',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
