import { Injectable } from "@nestjs/common";
import { AreasRepository } from "./areasRepository";

@Injectable()
export class LocationCheck {
	constructor(private readonly areasRepository: AreasRepository) {}

	// 반환한 킥보드가 킥보드의 원래 지역에 잘 반납됐는지 확인
	async checkInArea(
		deer_id: number,
		use_end_lat: number,
		use_end_lng: number
	): Promise<boolean> {
		return await this.areasRepository.checkInArea(
			deer_id,
			use_end_lat,
			use_end_lng
		);
	}

	// 반환한 킥보드가 파킹존에 반납됐는지 확인
	async checkInParkingZone(
		deer_id: number,
		use_end_lat: number,
		use_end_lng: number
	): Promise<boolean> {
		return this.areasRepository.checkInParkingZone(
			deer_id,
			use_end_lat,
			use_end_lng
		);
	}
}
