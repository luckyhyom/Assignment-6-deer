import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	JoinColumn
} from "typeorm";
import { ForbiddenAreaZones } from "./forbiddenAreaZones.entity";

@Entity("forbidden_coords")
export class ForbiddenCoords {
	@PrimaryGeneratedColumn()
	forbidden_coords_id!: number;

	@Column("decimal", { precision: 16, scale: 14 })
	forbidden_coords_lat!: number;

	@Column("decimal", { precision: 17, scale: 14 })
	forbidden_coords_lng!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@ManyToOne(
		() => ForbiddenAreaZones,
		(forbiddenAreaZone) => forbiddenAreaZone.forbidden_coords
	)
	@JoinColumn([
		{ name: "forbidden_area_id", referencedColumnName: "forbidden_area_id" }
	])
	forbidden_area_id?: number;
}
