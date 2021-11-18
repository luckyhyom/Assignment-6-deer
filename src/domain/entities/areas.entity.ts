import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { AreaCoords } from "./areaCoords.entity";
import { AreaPolicies } from "./areaPolicies.entity";
import { DeerKickboards } from "./deerKickboards.entity";
import { ForbiddenAreaZones } from "./forbiddenAreaZones.entity";
import { ParkingZones } from "./parkingZones.entity";
import { UserKickboardHistories } from "./userKickboardHistories.entity";

@Entity("areas")
export class Areas {
	@PrimaryGeneratedColumn()
	area_id!: number;

	@Column("geometry", { nullable: true, name: "polygon" })
	area_bounday!: string;

	@Column("point")
	area_center!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	// @OneToMany(
	// 	() => UserKickboardHistories,
	// 	(userKickboardHistories) => userKickboardHistories.area_id
	// )
	// userKickboardHistories?: UserKickboardHistories[];

	@OneToMany(() => AreaCoords, (areaCoords) => areaCoords.area_id)
	area_coords?: AreaCoords[];

	@OneToMany(() => ParkingZones, (parkingZone) => parkingZone.area_id)
	parking_zones?: ParkingZones[];

	@OneToMany(() => DeerKickboards, (deerKickboard) => deerKickboard.area_id)
	kickboards?: DeerKickboards[];

	@OneToMany(
		() => ForbiddenAreaZones,
		(forbiddenAreaZone) => forbiddenAreaZone.area_id
	)
	forbidden_area_zones?: ForbiddenAreaZones[];
}
