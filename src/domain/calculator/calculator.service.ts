import { Injectable } from '@nestjs/common';
import { DiscountService } from '../discount/discount.service';
import { AreaRepository } from '../rentalPay/area.repository';

@Injectable()
export class CalculatorService {
    calculationType = {
		discountPercent: 1,
		discountPrice: 2,
		penaltyPercent: 3,
		penaltyPrice: 4,
		exception: 5,
		perDistancePercent: 6,
		perDistancePrice: 7
	};
    
    constructor(private areaRepository: AreaRepository) {}

	async calculate(rentalPayReq, list, pay, history=null, base_payment = null) {
		pay = Number(pay);
		const sortedList = list.slice().sort((a, b) => b.code_id - a.code_id);
		const { use_end_lat, use_end_lng } = rentalPayReq;
		// discount 일 때만 타고, penalty, exception일 때는 이 if문을 탈 필요가 없음 
		if (history && DiscountService.isReusing(history)) {
			pay -= base_payment;
		}

		sortedList.forEach(async (item) => {
			item.amount = Number(item.amount);
			switch (item.code_id) {
				case this.calculationType.discountPrice:
					pay = Math.max(0, pay - item.amount);
					break;
				case this.calculationType.discountPercent:
					pay *= 1 - item.amount;
					break;
				case this.calculationType.penaltyPercent:
					pay *= 1 + item.amount;
					break;
				case this.calculationType.penaltyPrice:
					pay += item.amount;
					break;
				case this.calculationType.exception:
					pay = 0
					break;
				case this.calculationType.perDistancePercent:
					pay += item.amount * await this.measureDistance(use_end_lat, use_end_lng);
					break;
				case this.calculationType.perDistancePrice:
					break;
				default:
					break;
			}
		});
		return pay;
	}

	async measureDistance(use_end_lat, use_end_lng) {
		let distance = await this.areaRepository.returnDistance(use_end_lat, use_end_lng);
		distance *= 111 / 10; // 100m단위로 변경 1도 -> 111km
		return distance;
	}
	
}