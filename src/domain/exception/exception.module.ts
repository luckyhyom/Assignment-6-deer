import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExcepService } from "./excep.service";
import { ExceptionRepository } from "./exception.repository";

@Module({
	imports: [TypeOrmModule.forFeature([ExceptionRepository])],
	providers: [ExcepService],
	exports: [ExcepService]
})
export class ExceptionModule {}
