import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { JwtPayload } from "../auth/dto/jwtPayload.dto";
import { RentalPayReqDto } from "./dto/rentalPayReq.dto";
import { RentalPayService } from "./rentalPay.service";

@Controller("rentalPay")
export class RentalPayController {
	constructor(private readonly rentalPayService: RentalPayService) {}

	// 반납
	@Post()
	async returnKickboard(
		@Req() user: JwtPayload,
		@Body() body: RentalPayReqDto
	) {
		return await this.rentalPayService.returnKickboard(user, body);
	}
}
