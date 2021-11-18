// import { ApiProperty } from "@nestjs/swagger";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn
} from "typeorm";

@Entity("user")
export class User {
	@PrimaryColumn("varchar", { length: 20 })
	// @ApiProperty({ description: "ID" })
	user_id!: string;

	@Column("varchar", { length: 50, nullable: false })
	user_name!: string;

	@Column("varchar", { length: 200, nullable: false })
	password!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
