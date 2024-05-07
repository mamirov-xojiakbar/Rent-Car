import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface IMarkaCreationAttr {
  name: string;
}

@Table({ tableName: 'marka' })
export class Marka extends Model<Marka, IMarkaCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier for the marka',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'chevrolet',
    description: 'The name of the marka',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;
}
