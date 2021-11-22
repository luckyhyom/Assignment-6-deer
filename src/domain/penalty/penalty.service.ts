import { Injectable } from "@nestjs/common";
import { AreaRepository } from "../rentalPay/area.repository";
import { ForbiddenAreaZoneRepository } from "../rentalPay/forbiddenAreaZone.repository";
import { PenaltyDto } from "./dto/penaltyDto.dto";
import { PenaltyRes } from "./dto/penaltyRes.dto";
import { PenaltyRepository } from "./penalty.repository";

@Injectable()
export class PenaltyService {
	penaltyList = {
		outOfArea: 1,
		inForbiddenZone: 2
	};

	constructor(
		private readonly penaltyRepository: PenaltyRepository,
		private readonly areaRepository: AreaRepository,
		private readonly forbiddenAreaZoneRepository: ForbiddenAreaZoneRepository
	) {}

	async check(rentalInfo: PenaltyDto): Promise<PenaltyRes[]> {
		const checkList = [
			await this.isOutOfArea(rentalInfo),
			await this.isInForbiddenZone(rentalInfo),
		];				

		const filtered = checkList.filter((penalty) => {
			return penalty !== undefined;
		})

		const result = filtered.map((penalty) => {
			return new PenaltyRes(penalty);
		});

		return result;
	}

	// 지역 이탈
	private async isOutOfArea(rentalInfo) {
		const flag = await this.areaRepository.checkInArea(
			rentalInfo.deer_id,
			rentalInfo.use_end_lat,
			rentalInfo.use_end_lng
		);
		if (flag) return;
		const penaltyInfo = await this.penaltyRepository.getPenalty(
			this.penaltyList.outOfArea
		);
		return penaltyInfo;
	}
	
	// 주차 금지구역
	private async isInForbiddenZone(rentalInfo: PenaltyDto) {
		const flag = await this.forbiddenAreaZoneRepository.findForbiddenArea(
			rentalInfo.use_end_lat,
			rentalInfo.use_end_lng
		);
		if (!flag) return; // false :통과 

		// true : 벌금
		const penaltyInfo = await this.penaltyRepository.getPenalty(
			this.penaltyList.inForbiddenZone
		);
		return penaltyInfo;
	}
}
