import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { PenaltyHistories } from "./penaltyHistories.entity";

@Entity("penalties")
export class Penalties {
	@PrimaryGeneratedColumn()
	penalty_id!: number;

	@Column("varchar", { length: 50 })
	penalty_name!: string;

	@Column("decimal", { precision: 20, scale: 2 })
	penalty_pay!: number;

	@Column("int")
	code_id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(() => PenaltyHistories, (history) => history.penalty_id)
	history?: PenaltyHistories[];
}
