import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { JwtPayload } from "../auth/dto/jwtPayload.dto";
import { JwtGuard } from "../auth/guards/jwtGuard.guard";
import { RentalPayReqDto } from "./dto/rentalPayReq.dto";
import { RentalPayService } from "./rentalPay.service";

@Controller("rentalPay")
export class RentalPayController {
	constructor(private readonly rentalPayService: RentalPayService) {}

	// 반납
	@UseGuards(JwtGuard)
	@Post()
	async returnKickboard(@Req() req, @Body() body: RentalPayReqDto) {
		return await this.rentalPayService.createHistory(req.user, body);
	}
}
