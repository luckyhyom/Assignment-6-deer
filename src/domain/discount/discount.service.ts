import { Injectable } from "@nestjs/common";
import { ParkingZoneRepository } from "../rentalPay/parkingZone.repository";
import { UseKickboardHistoryRepository } from "../rentalPay/useKickboardHistory.repository";
import { DiscountRepository } from "./discount.repository";
import { DiscountDto } from "./dto/discount.dto";

@Injectable()
export class DiscountService {
	discountList = {
		parkingZone: 1,
		firstUsing: 2
	};

	constructor(
		private readonly useKickboardHistoryRepository: UseKickboardHistoryRepository,
		// private readonly areaRepository: AreaRepository,
		// private readonly areaPolicyRepository: AreaPolicyRepository,
		// private readonly forbiddenAreaZoneRepository: ForbiddenAreaZoneRepository,
		private readonly parkingZoneRepository: ParkingZoneRepository,
		private readonly discountRepository: DiscountRepository
	) {}

	check(discountDto: DiscountDto) {
		const useHistory =
			this.useKickboardHistoryRepository.findLatestOneOfUser(
				discountDto.user_id
			);
		// this.firstUsing

		this.isParking(discountDto.use_end_lat, discountDto.use_end_lng);
		this.isUsing(useHistory);
		this.isReusing(useHistory);
	}

	// 파킹존 반납
	private isParking(lat, lng) {
		if (!this.parkingZoneRepository.findParkingZone(lat, lng)) {
			return;
		}

		const parkingDiscount = this.discountRepository.getDiscount(
			this.discountList.parkingZone
		);
		return {
			// ...parkingDiscount
			할인이름: "파킹존",
			할인: "30%"
		};
	}

	// 첫 이용
	private isUsing(useHistory) {
		// 첫이용할인체크클래스()
		console.log(useHistory); // null 인지 빈 객체인지
		if (!useHistory)
			// const firstUsingDiscount = this.discountRepository.getDiscount(
			// 	this.discountId.firstUsing
			// );
			return this.discountList.firstUsing;

		return {
			할인코드: "첫이용할인"
		};
	}

	// 30분 이내 다시 이용시 기본요금 면제 근데 이건 테이블에 없지않아유???
	private isReusing(useHistory) {
		// if(useHistory)
	}
}

/** 드디어 됐다. 네네 환영 그럼 일단 만들어봅시다요.
 * 할인 적용 클래스 {
 *
 *  함수() {
 *      파킹존할인체크()
 *      첫이용할인체크클래스()
 *      return 할인 목록
 *  }
 * }
 *
 */
