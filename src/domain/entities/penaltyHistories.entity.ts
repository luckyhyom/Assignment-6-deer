import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Penalties } from "./penalties.entity";
import { UserKickboardHistories } from "./userKickboardHistories.entity";

@Entity("penalty_histories")
export class PenaltyHistories {
	@PrimaryGeneratedColumn()
	penalty_history_id!: number;

	@ManyToOne(() => Penalties, (penalty) => penalty.history)
	@JoinColumn([{ name: "penalty_id", referencedColumnName: "penalty_id" }])
	penalty_id!: number;

	@ManyToOne(
		() => UserKickboardHistories,
		(userHistories) => userHistories.penalty
	)
	@JoinColumn([
		{ name: "user_history_id", referencedColumnName: "user_history_id" }
	])
	user_history_id!: number;
}
