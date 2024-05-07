import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IWorkerCreationAttr {
  name: string;
  login: string;
  hashed_password: string;
  phone: string;
  photo: string;
}

@Table({ tableName: 'worker' })
export class Worker extends Model<Worker, IWorkerCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier for the worker',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the worker',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'example@email.com',
    description: 'The email address of the worker',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  login: string;

  @ApiProperty({
    example: 'hashed_password',
    description: 'The hashed password of the worker',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @ApiProperty({
    example: '+998910612296',
    description: 'The phone number of the worker',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({
    example: 'link',
    description: 'The photo link of the worker',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  photo: string;

  @ApiProperty({
    example: 'hashed_refresh_token',
    description: 'The hashed refresh token of the worker',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashed_refresh_token: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the worker is active or not',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_active: boolean;
}
