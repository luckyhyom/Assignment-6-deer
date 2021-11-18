import {
	Column,
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

@Entity("user_kickboard_histories")
export class UserKickboardHistories {
	@PrimaryGeneratedColumn()
	user_history_id: number;

	@ManyToOne(() => Users, (user) => user.userKickboardHistories)
	@JoinColumn([{ name: "user_id", referencedColumnName: "user_id" }])
	user_id!: string;

	@ManyToOne(
		() => DeerKickboards,
		(deerKickboards) => deerKickboards.userKickboardHistories
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

	@Column("date")
	use_start_at!: Date;

	@Column("date")
	use_end_at!: Date;

	@OneToMany(
		() => DiscountHistories,
		(discountHistory) => discountHistory.user_history_id
	)
	discount?: DiscountHistories[];

	@OneToMany(
		() => PenaltyHistories,
		(penaltyHistory) => penaltyHistory.user_history_id
	)
	penalty?: PenaltyHistories[];

	@OneToMany(
		() => ExceptionHistories,
		(exceptionHistory) => exceptionHistory.user_history_id
	)
	exception?: PenaltyHistories[];
}
