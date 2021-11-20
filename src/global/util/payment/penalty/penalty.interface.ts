import { RentalPayReqDto } from "src/domain/rentalPay/dto/rentalPayReq.dto";

export interface Penalty {
	IsYN(data: RentalPayReqDto): Promise<boolean>;
}
