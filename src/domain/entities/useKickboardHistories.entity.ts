import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import { Areas } from "./areas.entity";
import { DeerKickboards } from "./deerKickboards.entity";
import { DiscountHistories } from "./discountHistories.entity";
import { ExceptionHistories } from "./exceptionHistories.entity";
import { PenaltyHistories } from "./penaltyHistories.entity";
import { Users } from "./user.entity";

@Entity("use_kickboard_histories")
export class UseKickboardHistories {
	@PrimaryGeneratedColumn()
	use_history_id: number;

	@ManyToOne(() => Users, (user) => user.useKickboardHistories)
	@JoinColumn([{ name: "user_id", referencedColumnName: "user_id" }])
	user_id!: string;

	@ManyToOne(
		() => DeerKickboards,
		(deerKickboards) => deerKickboards.useKickboardHistories
	)
	@JoinColumn([{ name: "deer_id", referencedColumnName: "deer_id" }])
	deer_id!: number;

	// @ManyToOne(() => Areas, (area) => area.history)
	// @JoinColumn([{ name: "area_id", referencedColumnName: "area_id" }])
	// area_id!: number;

	@Column("decimal", { precision: 16, scale: 14 })
	use_end_lat!: number;

	@Column("decimal", {
		precision: 17,
		scale: 14
	})
	use_end_lng!: number;

	@Column("decimal", {
		precision: 20,
		scale: 2
	})
	pay!: number;

	@CreateDateColumn()
	use_start_at!: Date;

	@CreateDateColumn()
	use_end_at!: Date;

	@OneToMany(
		() => DiscountHistories,
		(discountHistory) => discountHistory.use_history_id
	)
	discount?: DiscountHistories[];

	@OneToMany(
		() => PenaltyHistories,
		(penaltyHistory) => penaltyHistory.use_history_id
	)
	penalty?: PenaltyHistories[];

	@OneToMany(
		() => ExceptionHistories,
		(exceptionHistory) => exceptionHistory.use_history_id
	)
	exception?: PenaltyHistories[];
}
