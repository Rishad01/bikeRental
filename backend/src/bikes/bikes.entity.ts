import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Reservation } from "../reservations/reservation.entity";

@Entity()
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  location: string;

  @Column("decimal", { precision: 3, scale: 2 })
  avgRating: number;

  @OneToMany(() => Reservation, (reservation) => reservation.bike)
  reservations: Reservation[];
}
