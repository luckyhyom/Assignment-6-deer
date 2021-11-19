import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Penalties } from "./penalties.entity";
import { UseKickboardHistories } from "./useKickboardHistories.entity";

@Entity("penalty_histories")
export class PenaltyHistories {
	@PrimaryGeneratedColumn()
	penalty_history_id!: number;

	@ManyToOne(() => Penalties, (penalty) => penalty.history)
	@JoinColumn([{ name: "penalty_id", referencedColumnName: "penalty_id" }])
	penalty_id!: number;

	@ManyToOne(
		() => UseKickboardHistories,
		(useHistories) => useHistories.penalty
	)
	@JoinColumn([
		{ name: "use_history_id", referencedColumnName: "use_history_id" }
	])
	use_history_id!: number;
}
