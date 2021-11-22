import { Injectable } from "@nestjs/common";
import { JwtPayload } from "../auth/dto/jwtPayload.dto";
import { DiscountService } from "../discount/discount.service";
import { AreaRepository } from "./area.repository";
import { AreaPolicyRepository } from "./areaPolicy.repository";
import { RentalPayReqDto } from "./dto/rentalPayReq.dto";
import { UseKickboardHistoryRepository } from "./useKickboardHistory.repository";
import { ExcepService } from "../exception/excep.service";
import { PenaltyService } from "../penalty/penalty.service";
import { CalculatorService } from "../calculator/calculator.service";

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
		private readonly calculatorService: CalculatorService,
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
			pay = await this.calculatorService.calculate(rentalPayReq, exceptionList, pay, user.user_id);
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
			pay = await this.calculatorService.calculate(rentalPayReq, penaltyList, pay);
			
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
			pay = await this.calculatorService.calculate(rentalPayReq, discountList, pay, history, policy[0].base_payment);
		}

		return await this.useKickboardHistoryRepository.createOne(user.user_id, rentalPayReq, pay);
	}

}