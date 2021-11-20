import { EntityRepository, Repository } from "typeorm";
import { Exceptions } from "../entities/exceptions.entity";

@EntityRepository(Exceptions)
export class ExceptionRepository extends Repository<Exceptions> {
	async getException(exception_id: number) {
		return await this.findOne({ exception_id: exception_id });
	}
}
