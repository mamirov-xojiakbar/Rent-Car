import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IClientCreationAttr {
  full_name: string;
  phone: string;
  email: string;
  hashed_password: string;
  photo: string;
  address: string;
  passport: string;
  license: boolean;
}

@Table({ tableName: 'clients' })
export class Client extends Model<Client, IClientCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier for the client',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the client',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  full_name: string;

  @ApiProperty({
    example: '+998 91 061 22 96',
    description: 'The phone number of the client',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({
    example: 'example@email.com',
    description: 'The email address of the client',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: 'hashed_password',
    description: 'The hashed password of the client',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @ApiProperty({
    example: 'photo_url',
    description: "The URL of the client's photo",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  photo: string;

  @ApiProperty({
    example: '123 Street, City',
    description: 'The address of the client',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ApiProperty({ example: '...', description: 'The passport of the client' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  passport: string;

  @ApiProperty({
    example: 'true',
    description: 'The license of the client',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  license: boolean;

  @ApiProperty({
    example: 'hashed_refresh_token',
    description: 'The hashed refresh token of the client',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashed_refresh_token: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the client is active or not',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'link',
    description: 'Activation link',
  })
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}
