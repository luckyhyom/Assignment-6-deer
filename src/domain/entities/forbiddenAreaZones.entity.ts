import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	JoinColumn,
	OneToMany
} from "typeorm";
import { Areas } from "./areas.entity";
import { ForbiddenCoords } from "./forbiddenCoords.entity";

@Entity("forbidden_area_zones")
export class ForbiddenAreaZones {
	@PrimaryGeneratedColumn()
	forbidden_area_id!: number;

	@Column("polygon")
	forbidden_area_boundary!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@ManyToOne(() => Areas, (area) => area.forbidden_area_zones)
	@JoinColumn([{ name: "area_id", referencedColumnName: "area_id" }])
	area_id?: number;

	@OneToMany(
		() => ForbiddenCoords,
		(forbiddenCoord) => forbiddenCoord.forbidden_area_id
	)
	forbidden_coords?: ForbiddenCoords[];
}
