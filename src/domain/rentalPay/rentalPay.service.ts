import { Injectable } from "@nestjs/common";
import { PenaltyService } from "src/global/util/payment/penalty/checkPenalty";
import { JwtPayload } from "../auth/dto/jwtPayload.dto";
import { RentalPayReqDto } from "./dto/rentalPayReq.dto";
import { UseKickboardHistoryRepository } from "./useKickboardHistory.repository";

@Injectable()
export class RentalPayService {
	constructor(
		private readonly penaltyService: PenaltyService,
		private readonly useKickboardHistoryRepository: UseKickboardHistoryRepository
	) {}

	async returnKickboard(user: JwtPayload, rentalPayReq: RentalPayReqDto) {
		if (CheckException(rentalPayReq))
			return await this.useKickboardHistoryRepository.createOne(
				rentalPayReq
			);
		rentalpayReq = this.penaltyService.checkPenalties(rentalPayReq);

		CheckDiscount(rentalPayReq);
		return await this.useKickboardHistoryRepository.createOne(rentalPayReq);
	}
}
