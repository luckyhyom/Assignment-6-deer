import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { DiscountHistories } from "./discountHistories.entity";

@Entity("discounts")
export class Discounts {
	@PrimaryGeneratedColumn()
	discount_id!: number;

	@Column("varchar", { length: 50 })
	discount_name!: string;

	@Column("decimal", { precision: 20, scale: 2 })
	discount_pay!: number;

	@Column("int")
	code_id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(() => DiscountHistories, (history) => history.discount_id)
	history?: DiscountHistories[];
}
