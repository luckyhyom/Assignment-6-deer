import { IsNotEmpty, IsString } from "class-validator";

export class ResponseTokenDto {
	@IsString()
	@IsNotEmpty()
	token!: string;
}
