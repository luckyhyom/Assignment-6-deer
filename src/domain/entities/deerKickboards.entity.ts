import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { UserKickboardHistories } from "./userKickboardHistories.entity";
import { Areas } from "./areas.entity";

@Entity("deer_kickboards")
export class DeerKickboards {
	@PrimaryGeneratedColumn()
	deer_id!: number;

	@ManyToOne(() => Areas, (area) => area.kickboards)
	area_id!: number;

	@Column("varchar", { length: 50 })
	deer_namevar!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(
		() => UserKickboardHistories,
		(userKickboardHistories) => userKickboardHistories.deer_id
	)
	userKickboardHistories?: UserKickboardHistories[];
}
