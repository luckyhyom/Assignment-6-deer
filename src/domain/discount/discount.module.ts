import { Module } from "@nestjs/common";
import { DiscountService } from "./discount.service";

@Module({
	exports: [],
	providers: [DiscountService]
})
export class DiscountModule {}
