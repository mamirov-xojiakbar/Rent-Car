import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface IWeekDayCreationAttr {
  name: string;
}

@Table({ tableName: 'week_day' })
export class WeekDay extends Model<WeekDay, IWeekDayCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier for the week-day',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'dushanba',
    description: 'The name of the week-day',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;
}
