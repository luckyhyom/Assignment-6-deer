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
		const array = [];
		const row1 = await this.isOutOfArea(rentalInfo);
		const row2 = await this.isInForbiddenZone(rentalInfo);
		if (row1) array.push(row1);
		if (row2) array.push(row2);

		const result = array.map( item => {
			if (item) return new PenaltyRes(item);
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
