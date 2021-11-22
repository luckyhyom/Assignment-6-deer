import { EntityRepository, Repository } from "typeorm";
import { UseKickboardHistories } from "../entities/useKickboardHistories.entity";
import { Users } from "../entities/user.entity";

@EntityRepository(UseKickboardHistories)
export class UseKickboardHistoryRepository extends Repository<UseKickboardHistories> {
	async createOne(user_id, useKickboardHistory, pay) {
		const user = new Users();
		user.user_id = user_id;
		useKickboardHistory.pay = pay;
		useKickboardHistory.user_id = user;
		return await this.save(useKickboardHistory);
	}

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
