import { IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class RentalPayDto {
	@IsString()
	@IsNotEmpty()
	user_id!: string;

	@IsDecimal()
	@IsNotEmpty()
	use_end_lat!: number;

	@IsDecimal()
	@IsNotEmpty()
	use_end_lng!: number;

	@IsDecimal()
	@IsNotEmpty()
	base_payment!: number;
}
