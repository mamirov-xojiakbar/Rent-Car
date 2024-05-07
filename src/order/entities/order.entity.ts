import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Car } from "src/cars/entities/car.entity";
import { Client } from "src/client/entities/client.entity";
import { Status } from "src/status/entities/status.entity";
import { Worker } from "src/worker/entities/worker.entity";

interface IOrderCreationAttr {
  clientId: number;
  carId: number;
  start_date: string;
  end_date: string;
  total_price: number;
  deposit: number;
  statusId: number;
  workerId: number;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, IOrderCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier for the order',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the client',
  })
  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  clientId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the car',
  })
  @ForeignKey(() => Car)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  carId: number;

  @ApiProperty({
    example: '2024-05-05',
    description: 'The date of the start-date',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date: string;

  @ApiProperty({
    example: '2024-05-08',
    description: 'The date of the end-date',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date: string;

  @ApiProperty({
    example: 300.0,
    description: 'The date of the start-date',
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  total_price: number;

  @ApiProperty({
    example: 50.0,
    description: 'The date of the start-date',
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  deposit: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the status',
  })
  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the worker',
  })
  @ForeignKey(() => Worker)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  workerId: number;

  @BelongsTo(() => Client)
  client: Client;

  @BelongsTo(() => Car)
  car: Car;

  @BelongsTo(() => Status)
  status: Status;

  @BelongsTo(() => Worker)
  worker: Worker;
}
