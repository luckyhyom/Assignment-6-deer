import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	JoinColumn
} from "typeorm";
import { UseKickboardHistories } from "./useKickboardHistories.entity";
import { Areas } from "./areas.entity";

@Entity("deer_kickboards")
export class DeerKickboards {
	@PrimaryGeneratedColumn()
	deer_id!: number;

	@ManyToOne(() => Areas, (area) => area.kickboards)
	@JoinColumn([{ name: "area_id", referencedColumnName: "area_id" }])
	area_id!: number;

	@Column("varchar", { length: 50 })
	deer_namevar!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(
		() => UseKickboardHistories,
		(useKickboardHistories) => useKickboardHistories.deer_id
	)
	useKickboardHistories?: UseKickboardHistories[];
}
