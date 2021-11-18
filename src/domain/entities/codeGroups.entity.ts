import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Codes } from "./codes.entity";

@Entity("code_groups")
export class CodeGroups {
	@PrimaryGeneratedColumn()
	code_group_id!: number;

	@Column("varchar", { length: 50 })
	code_group_name!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(() => Codes, (code) => code.code_group_id)
	code?: Codes[];
}
