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

@Entity("area_coords")
export class AreaCoords {
	@PrimaryGeneratedColumn()
	area_coords_id!: number;

	@Column("decimal", { precision: 16, scale: 14 })
	area_coords_lat!: number;

	@Column("decimal", { precision: 17, scale: 14 })
	area_coords_lng!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@ManyToOne(() => Areas, (area) => area.area_coords)
	@JoinColumn([{ name: "area_id", referencedColumnName: "area_id" }])
	area_id!: number;
}
