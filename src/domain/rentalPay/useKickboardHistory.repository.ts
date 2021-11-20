import { EntityRepository, Repository } from "typeorm";
import { UseKickboardHistories } from "../entities/useKickboardHistories.entity";

@EntityRepository(UseKickboardHistories)
export class UseKickboardHistoryRepository extends Repository<UseKickboardHistories> {
	async createOne(useKickboardHistory) {
		return await this.save(useKickboardHistory);
	}

	// async createOne(useKickboardHistory, pay) {
	// 	useKickboardHistory.pay = pay;
	// 	return await this.save(useKickboardHistory);
	// }

	async findLatestOneOfUser(user_id) {
		return await this.findOne({
			where: {
				user_id
			},
			order: {
				use_end_at: "DESC"
			}
		});
	}
}
