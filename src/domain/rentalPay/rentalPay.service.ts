import { Injectable } from "@nestjs/common";
import { JwtPayload } from "../auth/dto/jwtPayload.dto";
import { DiscountService } from "../discount/discount.service";
import { AreaRepository } from "./area.repository";
import { AreaPolicyRepository } from "./areaPolicy.repository";
import { RentalPayReqDto } from "./dto/rentalPayReq.dto";
import { UseKickboardHistoryRepository } from "./useKickboardHistory.repository";
import { ExcepService } from "../exception/excep.service";
import { PenaltyService } from "../penalty/penalty.service";

@Injectable()
export class RentalPayService {
	calculationType = {
		discountPercent: 1,
		discountPrice: 2,
		penaltyPercent: 3,
		penaltyPrice: 4,
		exception: 5,
		perDistancePercent: 6,
		perDistancePrice: 7
	};

	constructor(
		private readonly discountService: DiscountService,
		private readonly penaltyService: PenaltyService,
		private readonly ExcepService: ExcepService,
		private readonly useKickboardHistoryRepository: UseKickboardHistoryRepository,
		private readonly areaPolicyRepository: AreaPolicyRepository,
		private readonly areaRepository: AreaRepository
	) {}

	async createHistory(user, rentalPayReq: RentalPayReqDto) {
		let pay = 0;
		
		const history = await this.useKickboardHistoryRepository.findLatestOneOfUser(
			user.user_id
		);
		// 예외 확인
		const exceptionList = await this.ExcepService.check(rentalPayReq);
		if (exceptionList.length > 0) {
			return await this.calculate(rentalPayReq, exceptionList, pay, user.user_id);
		}
		// 지역별 요금 계산
		const usingMinute =
			(new Date(rentalPayReq.use_end_at).getTime() -
				new Date(rentalPayReq.use_start_at).getTime()) /
			60000;
		const policy = await this.areaPolicyRepository.findPolicy(
			rentalPayReq.deer_id
		);
		pay = Number(policy[0].base_payment) + Number(policy[0].minute_payment) * usingMinute;
		// 벌금 확인
		const penaltyList = await this.penaltyService.check(rentalPayReq);
		// 벌금 계산
		if (penaltyList.length > 0) {
			const result = await this.calculate(rentalPayReq, penaltyList, pay, user.user_id);
			return result;
		}
		// 할인 확인
		const discountDTO = {
			user_id: user.user_id,
			use_end_lat: rentalPayReq.use_end_lat,
			use_end_lng: rentalPayReq.use_end_lng,
			base_payment: policy[0].base_payment
		};
		const discountList = await this.discountService.check(discountDTO);
		// 할인 계산
		if (discountList.length > 0) {
			return await this.calculate(rentalPayReq, discountList, pay,user.user_id, history, policy[0].base_payment);
		}
	}

	async returnPay(user_id: string,rentalPayReq: RentalPayReqDto, pay: number) {
		const result = await this.useKickboardHistoryRepository.createOne(
			user_id,
			rentalPayReq,
			pay
		);
		return result;
	}

	async calculate(rentalPayReq, list, pay, user_id, history=null, base_payment = null) {
		pay = Number(pay);
		const sortedList = list.slice().sort((a, b) => b.code_id - a.code_id);
		// discount 일 때만 타고, penalty, exception일 때는 이 if문을 탈 필요가 없음 
		if (history && this.discountService.isReusing(history)) {
			pay -= base_payment;
		}

		sortedList.forEach(async (item) => {
			item.discount_pay = Number(item.discount_pay);
			item.penalty_pay = Number(item.penalty_pay);
			switch (item.code_id) {
				case this.calculationType.discountPrice:
					pay = Math.max(0, pay - item.discount_pay);
					break;
				case this.calculationType.discountPercent:
					pay *= 1 - item.discount_pay;
					break;
				case this.calculationType.penaltyPercent:
					pay *= 1 + item.penalty_pay;
					break;
				case this.calculationType.penaltyPrice:
					pay += item.penalty_pay;
					break;
				case this.calculationType.exception:
					pay = 0;
					break;
				case this.calculationType.perDistancePercent:
					let dist = await this.areaRepository.returnDistance(
						rentalPayReq.use_end_lat,
						rentalPayReq.use_end_lng
					);
					dist *= 111 / 10; // 100m단위로 변경 1도 -> 111km
					pay += dist * item.penalty_pay;
					break;
				case this.calculationType.perDistancePrice:
					break;
				default:
					break;
			}
		});
		return await this.returnPay(user_id, rentalPayReq, pay);
	}
}
