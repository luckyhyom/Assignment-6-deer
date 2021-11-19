import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
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
	@JoinColumn([{ name: "area_id", referencedColumnName: "area_id" }])
	area_id!: number;
}
