import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentalPayModule } from "../rentalPay/rentalPay.module";
import { ExceptionRepository } from "./exception.repository";

@Module({
	imports: [TypeOrmModule.forFeature([ExceptionRepository]), RentalPayModule],
	exports: [],
	providers: [ExceptionModule]
})
export class ExceptionModule {}
