// import { ApiProperty } from "@nestjs/swagger";
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn
} from "typeorm";
import { UserKickboardHistories } from "./userKickboardHistories.entity";

@Entity("users")
export class Users {
	@PrimaryColumn("varchar", { length: 20 })
	// @ApiProperty({ description: "ID" })
	user_id!: string;

	@Column("varchar", { length: 50, nullable: false })
	user_name!: string;

	@Column("varchar", { length: 200, nullable: false })
	password!: string;

	@OneToMany(
		() => UserKickboardHistories,
		(userKickboardHistories) => userKickboardHistories.user_id
	)
	userKickboardHistories?: UserKickboardHistories[];

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
