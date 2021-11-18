import {
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Areas } from "./areas.entity";

@Entity("area_policies")
export class AreaPolicies {
	@PrimaryGeneratedColumn()
	area_policy_id!: number;

	@Column("decimal", { precision: 20, scale: 2 })
	base_payment!: number;

	@Column("decimal", { precision: 20, scale: 2 })
	minute_payment!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToOne(() => Areas)
	area_id!: number;
}
