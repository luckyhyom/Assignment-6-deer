import { Injectable } from "@nestjs/common";
import { JwtPayload } from "../auth/dto/jwtPayload.dto";
import { AreaRepository } from "./area.repository";
import { AreaPolicyRepository } from "./areaPolicy.repository";
import { RentalPayReqDto } from "./dto/rentalPayReq.dto";
import { ForbiddenAreaZoneRepository } from "./forbiddenAreaZone.repository";
import { ParkingZoneRepository } from "./parkingZone.repository";
import { UseKickboardHistoryRepository } from "./useKickboardHistory.repository";

@Injectable()
export class RentalPayService {
	constructor(
		private readonly useKickboardHistoryRepository: UseKickboardHistoryRepository,
		private readonly areaRepository: AreaRepository,
		private readonly areaPolicyRepository: AreaPolicyRepository,
		private readonly forbiddenAreaZoneRepository: ForbiddenAreaZoneRepository,
		private readonly parkingZoneRepository: ParkingZoneRepository
	) {}

	async returnKickboard(user: JwtPayload, rentalPayReq: RentalPayReqDto) {
		const { deer_id, use_end_lat, use_end_lng, use_start_at, use_end_at } = rentalPayReq;
		let pay = 0;
		const usingMinute =
			(new Date(use_end_at).getTime() -
				new Date(use_start_at).getTime()) /
			60000;
		// 예외
		// 1분 미만 - 무료
		if (usingMinute < 1) {
			return await this.useKickboardHistoryRepository.createOne(rentalPayReq, pay);
		}

		// 지역별 요금제 (기본 요금 + 분당 요금)
		const policy = await this.areaPolicyRepository.findPolicy(deer_id); // 기본요금, 분당 요금 return
		
		// 요금제와 사용시간으로 이용료 계산
		pay = policy[0].base_payment + policy[0].minute_payment * usingMinute;

		// 벌금 (+할인 무효)
		let isPunished = false;

		//   주차 금지 구역
		const forbiddenAreaId = this.forbiddenAreaZoneRepository.findForbiddenArea(use_end_lat, use_end_lng); // forbidden_area_id
		if(forbiddenAreaId) {
			pay += 6000;
			isPunished = true;
		}

		//   지역 이탈시
		const distancefromArea = await this.areaRepository.returnDistance(use_end_lat, use_end_lng);
		const distance = distancefromArea * 111 / 10; // 100미터 단위
		if (distance > 0) {
			pay += distance * 500;
			isPunished = true;
		}
		
		if (isPunished) {
			return await this.useKickboardHistoryRepository.createOne(rentalPayReq, pay);
		}

		// 할인
		//  30분 이내 다시 이용시 기본 요금 면제
		const latestHistoryOfUser = await this.useKickboardHistoryRepository.findLatestOneOfUser(user.user_id);
		if (new Date(use_start_at).getTime() - new Date(latestHistoryOfUser.use_end_at).getTime() < 30*60*1000) {
			pay -= policy.base_payment;
		}
		//   파킹존 반납 (30%)
		const parkingZoneId = this.parkingZoneRepository.findParkingZone(use_end_lat, use_end_lng);
		if (parkingZoneId) {
			pay *= 0.7;
		}

		return await this.useKickboardHistoryRepository.createOne(rentalPayReq, pay);
	}
}
