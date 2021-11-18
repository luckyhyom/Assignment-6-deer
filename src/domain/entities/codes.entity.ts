import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	JoinColumn
} from "typeorm";
import { CodeGroups } from "./codeGroups.entity";

@Entity("codes")
export class Codes {
	@PrimaryGeneratedColumn()
	code_id!: number;

	@ManyToOne(() => CodeGroups, (codeGroup) => codeGroup.code)
	@JoinColumn([
		{ name: "code_group_id", referencedColumnName: "code_group_id" }
	])
	code_group_id!: number;

	@Column("varchar", { length: 50 })
	code_name!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
