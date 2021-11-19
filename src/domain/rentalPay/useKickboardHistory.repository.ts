import { EntityRepository, Repository } from "typeorm";
import { UseKickboardHistories } from "../entities/useKickboardHistories.entity";

@EntityRepository(UseKickboardHistories)
export class UseKickboardHistoryRepository extends Repository<UseKickboardHistories> {
	async createOne(useKickboardHistory) {
		return this.save(useKickboardHistory);
	}
}
