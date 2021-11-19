import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Discounts } from "./discounts.entity";
import { UseKickboardHistories } from "./useKickboardHistories.entity";

@Entity("discount_histories")
export class DiscountHistories {
	@PrimaryGeneratedColumn()
	discount_history_id!: number;

	@ManyToOne(() => Discounts, (discount) => discount.history)
	@JoinColumn([{ name: "discount_id", referencedColumnName: "discount_id" }])
	discount_id!: number;

	@ManyToOne(
		() => UseKickboardHistories,
		(useHistories) => useHistories.discount
	)
	@JoinColumn([
		{ name: "use_history_id", referencedColumnName: "use_history_id" }
	])
	use_history_id!: number;
}
