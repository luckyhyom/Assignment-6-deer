import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscountService } from "./discount.service";

@Module({
	imports: [TypeOrmModule.forFeature([])],
	providers: [DiscountService],
	exports: []
})
export class DiscountModule {}
