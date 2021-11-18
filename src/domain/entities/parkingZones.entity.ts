import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Areas } from "./areas.entity";

@Entity("parking_zones")
export class ParkingZones {
	@PrimaryGeneratedColumn()
	user_history_id!: number;

	@ManyToOne(() => Areas, (area) => area.parking_zones)
	@JoinColumn([{ name: "area_id", referencedColumnName: "area_id" }])
	area_id!: number;

	@Column("decimal", { precision: 16, scale: 14 })
	parkingzone_center_lat!: number;

	@Column("decimal", { precision: 17, scale: 14 })
	parkingzone_center_lng!: number;

	@Column("decimal", { precision: 17, scale: 14 })
	parkingzone_radius!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
