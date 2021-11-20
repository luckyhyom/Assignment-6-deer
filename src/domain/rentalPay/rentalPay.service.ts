import { Injectable } from "@nestjs/common";
import { JwtPayload } from "../auth/dto/jwtPayload.dto";
import { DiscountService } from "../discount/discount.service";
import { ExceptionService } from "../exception/exception.service";
import { PenaltyService } from "../penalty/penalty.service";
import { AreaRepository } from "./area.repository";
import { AreaPolicyRepository } from "./areaPolicy.repository";
import { RentalPayReqDto } from "./dto/rentalPayReq.dto";
import { UseKickboardHistoryRepository } from "./useKickboardHistory.repository";

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
		private readonly exceptionService: ExceptionService,
		private readonly useKickboardHistoryRepository: UseKickboardHistoryRepository,
		private readonly areaPolicyRepository: AreaPolicyRepository,
		private readonly areaRepository: AreaRepository
	) {}

	async createHistory(user: JwtPayload, rentalPayReq: RentalPayReqDto) {
		let pay = 0;

		// 예외 확인
		const exceptionList = await this.exceptionService.check(rentalPayReq);
		if (exceptionList.length > 0) {
			return this.calculate(rentalPayReq, exceptionList, pay);
		}

		// 지역별 요금 계산
		const usingMinute =
			(new Date(rentalPayReq.use_end_at).getTime() -
				new Date(rentalPayReq.use_start_at).getTime()) /
			60000;
		const policy = await this.areaPolicyRepository.findPolicy(
			rentalPayReq.deer_id
		);
		pay = policy[0].base_payment + policy[0].minute_payment * usingMinute;

		// 벌금 확인
		const penaltyList = await this.penaltyService.check(rentalPayReq);
		// 벌금 계산
		if (penaltyList.length > 0) {
			return this.calculate(rentalPayReq, penaltyList, pay);
		}

		// 할인 확인
		const discountList = this.discountService.check(rentalPayReq);
		// 할인 계산
		if (discountList.length > 0) {
			pay = this.calculate(rentalPayReq, discountList, pay);
			return this.useKickboardHistoryRepository.createOne(
				rentalPayReq,
				pay
			);
		}
	}

	async returnPay(rentalPayReq: RentalPayReqDto, pay: number) {
		return await this.useKickboardHistoryRepository.createOne(
			rentalPayReq,
			pay
		);
	}

	calculate(rentalPayReq, list, pay) {
		const sortedList = list.slice().sort((a, b) => b.code_id - a.code_id);

		sortedList.forEach(async (item) => {
			item.discount_name;

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
					return this.returnPay(rentalPayReq, pay);
				case this.calculationType.exception:
					pay += 0;
					return this.returnPay(rentalPayReq, pay);
				case this.calculationType.perDistancePercent:
					let dist = await this.areaRepository.returnDistance(
						rentalPayReq.use_end_lat,
						rentalPayReq.use_end_lng
					);
					dist *= 111 / 10; // 100m단위로 변경 1도 -> 111km
					pay += dist * item.penalty_pay;
					return this.returnPay(rentalPayReq, pay);
				case this.calculationType.perDistancePrice:
					break;
				default:
					break;
			}
		});

		return pay;
	}
}
