import { Injectable } from "@nestjs/common";
import { ExceptionDto } from "./dto/exceptionDto.dto";
import { ExceptionRepository } from "./exception.repository";

@Injectable()
export class ExcepService {
	exceptionList = {
		oneMinute: 1
	};

	constructor(private readonly exceptionRepository: ExceptionRepository) {}

	async check(rentalInfo: ExceptionDto) {
		const array = [];
		const row1 = await this.isLessOneMinute(rentalInfo);
		if (row1) array.push(row1);
		return array;
	}

	async isLessOneMinute(rentalInfo) {
		if (
			new Date(rentalInfo.use_end_at).getTime() -
			new Date(rentalInfo.use_start_at).getTime() < 1 * 60 * 1000
		)
			return await this.exceptionRepository.getException(
				this.exceptionList.oneMinute
			);
	}
}
