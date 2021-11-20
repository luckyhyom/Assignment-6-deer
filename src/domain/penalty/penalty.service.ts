import { Injectable } from "@nestjs/common";
import { AreaRepository } from "../rentalPay/area.repository";
import { ForbiddenAreaZoneRepository } from "../rentalPay/forbiddenAreaZone.repository";
import { PenaltyDto } from "./dto/penaltyDto.dto";
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

	async check(rentalInfo: PenaltyDto) {
		rentalInfo = await this.outOfArea(rentalInfo);
		rentalInfo = await this.inForbiddenZone(rentalInfo);
		return rentalInfo;
	}

	// 지역 이탈
	private async outOfArea(rentalInfo: PenaltyDto) {
		let dist = await this.areaRepository.returnDistance(
			rentalInfo.use_end_lat,
			rentalInfo.use_end_lng
		);
		dist *= 111 / 10; // 100m단위로 변경 1도 -> 111km
		const penaltyInfo = await this.penaltyRepository.getPenalty(
			this.penaltyList.outOfArea
		);
		rentalInfo.pay += dist * penaltyInfo.penalty_pay;
		return rentalInfo;
	}

	// 주차 금지구역
	private async inForbiddenZone(rentalInfo: PenaltyDto) {
		const flag = await this.forbiddenAreaZoneRepository.findForbiddenArea(
			rentalInfo.use_end_lat,
			rentalInfo.use_end_lng
		);
		const penaltyInfo = await this.penaltyRepository.getPenalty(
			this.penaltyList.inForbiddenZone
		);
		if (flag) rentalInfo.pay += penaltyInfo.penalty_pay;
		return rentalInfo;
	}
}
