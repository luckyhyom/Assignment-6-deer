import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Exceptions } from "./exceptions.entity";
import { UserKickboardHistories } from "./userKickboardHistories.entity";

@Entity()
export class ExceptionHistories {
	@PrimaryGeneratedColumn()
	exception_history_id!: number;

	@ManyToOne(() => Exceptions, (exception) => exception.history)
	@JoinColumn([
		{ name: "exception_id", referencedColumnName: "exceptions_id" }
	])
	exception_id!: number;

	@ManyToOne(
		() => UserKickboardHistories,
		(userHistories) => userHistories.exception
	)
	@JoinColumn([
		{ name: "user_history_id", referencedColumnName: "user_history_id" }
	])
	user_history_id!: number;
}
