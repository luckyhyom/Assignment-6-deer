import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AreaRepository } from "src/domain/rentalPay/area.repository";
import { OutAreaPenalty } from "./childClass/outAreaPenalty";

@Module({
	imports: [TypeOrmModule.forFeature([AreaRepository])],
	providers: [OutAreaPenalty],
	exports: [OutAreaPenalty]
})
export class PenaltyModule {}
