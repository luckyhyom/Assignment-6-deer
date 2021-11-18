import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Discounts } from "./discounts.entity";
import { UserKickboardHistories } from "./userKickboardHistories.entity";

@Entity("discount_histories")
export class DiscountHistories {
	@PrimaryGeneratedColumn()
	discount_history_id!: number;

	@ManyToOne(() => Discounts, (discount) => discount.history)
	@JoinColumn([{ name: "discount_id", referencedColumnName: "discount_id" }])
	discount_id!: number;

	@ManyToOne(
		() => UserKickboardHistories,
		(userHistories) => userHistories.discount
	)
	@JoinColumn([
		{ name: "user_history_id", referencedColumnName: "user_history_id" }
	])
	user_history_id!: number;
}
