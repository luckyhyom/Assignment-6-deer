import { Injectable } from "@nestjs/common";
import { JwtPayload } from "../auth/dto/jwtPayload.dto";
import { AreaRepository } from "./area.repository";
import { AreaPolicyRepository } from "./areaPolicy.repository";
import { RentalPayReqDto } from "./dto/rentalPayReq.dto";
import { ForbiddenAreaZoneRepository } from "./forbiddenAreaZone.repository";
import { UseKickboardHistoryRepository } from "./useKickboardHistory.repository";

@Injectable()
export class RentalPayService {
	constructor(
		private readonly useKickboardHistoryRepository: UseKickboardHistoryRepository,
		private readonly areaRepository: AreaRepository,
		private readonly areaPolicyRepository: AreaPolicyRepository,
		private readonly forbiddenAreaZoneRepository: ForbiddenAreaZoneRepository
	) {}

	async returnKickboard(user: JwtPayload, rentalPayReq: RentalPayReqDto) {
		const { deer_id, use_end_lat, use_end_lng, use_start_at, use_end_at } =
			rentalPayReq;
		const usingMinute =
			(new Date(use_end_at).getTime() -
				new Date(use_start_at).getTime()) /
			60000;
		// 예외
		// 1분 미만 - 무료
		if (usingMinute < 1) {
			return 0;
		}

		// 지역별 요금제 (기본 요금 + 분당 요금)
		const areaId = this.areaRepository.returnAreaId(
			use_end_lat,
			use_end_lng
		); // area_id
		await this.areaPolicyRepository.findPolicy(areaId); // 기본요금, 분당 요금 return

		// 벌금
		// 벌금에 걸리면 할인 무효 / 벌금에 걸리면 요금에 +
		//   주차 금지 구역
		//   지역 이탈
		const forbiddenArea =
			this.forbiddenAreaZoneRepository.findForbiddenArea(
				use_end_lat,
				use_end_lng
			); // forbidden_area_id

		// 할인 살려주세요.
		//   파킹존 반납 (30%)
		//   첫 이용
		//   30분 이내 다시 이용시 기본 요금 면제
		return await this.useKickboardHistoryRepository.createOne(rentalPayReq);
	}
}
