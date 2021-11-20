import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { ExceptionHistories } from "./exceptionHistories.entity";

@Entity("exceptions")
export class Exceptions {
	@PrimaryGeneratedColumn()
	exception_id!: number;

	@Column("varchar", { length: 50 })
	exception_name!: string;

	@Column("int")
	code_id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(() => ExceptionHistories, (history) => history.exception_id)
	history?: ExceptionHistories[];
}
