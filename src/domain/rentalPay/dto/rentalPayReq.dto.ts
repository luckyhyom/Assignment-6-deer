import { IsDate, IsDecimal, IsInt, IsNotEmpty } from "class-validator";

export class RentalPayReqDto {
	@IsInt()
	@IsNotEmpty()
	deer_id!: number;

	@IsDecimal()
	@IsNotEmpty()
	use_end_lat!: number;

	@IsDecimal()
	@IsNotEmpty()
	use_end_lng!: number;

	@IsDate()
	@IsNotEmpty()
	use_start_at!: Date;

	@IsDate()
	@IsNotEmpty()
	use_end_at!: Date;
}
