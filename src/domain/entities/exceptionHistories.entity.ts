import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Exceptions } from "./exceptions.entity";
import { UseKickboardHistories } from "./useKickboardHistories.entity";

@Entity()
export class ExceptionHistories {
	@PrimaryGeneratedColumn()
	exception_history_id!: number;

	@ManyToOne(() => Exceptions, (exception) => exception.history)
	@JoinColumn([
		{ name: "exception_id", referencedColumnName: "exception_id" }
	])
	exception_id!: number;

	@ManyToOne(
		() => UseKickboardHistories,
		(useHistories) => useHistories.exception
	)
	@JoinColumn([
		{ name: "use_history_id", referencedColumnName: "use_history_id" }
	])
	use_history_id!: number;
}
