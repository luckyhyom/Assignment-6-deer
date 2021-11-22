import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./domain/entities/user.entity";
import { AuthModule } from "./domain/auth/auth.module";
import { UserModule } from "./domain/user/user.module";
import { AreaCoords } from "./domain/entities/areaCoords.entity";
import { AreaPolicies } from "./domain/entities/areaPolicies.entity";
import { Areas } from "./domain/entities/areas.entity";
import { CodeGroups } from "./domain/entities/codeGroups.entity";
import { Codes } from "./domain/entities/codes.entity";
import { DeerKickboards } from "./domain/entities/deerKickboards.entity";
import { DiscountHistories } from "./domain/entities/discountHistories.entity";
import { Discounts } from "./domain/entities/discounts.entity";
import { ExceptionHistories } from "./domain/entities/exceptionHistories.entity";
import { Exceptions } from "./domain/entities/exceptions.entity";
import { ForbiddenAreaZones } from "./domain/entities/forbiddenAreaZones.entity";
import { ForbiddenCoords } from "./domain/entities/forbiddenCoords.entity";
import { ParkingZones } from "./domain/entities/parkingZones.entity";
import { Penalties } from "./domain/entities/penalties.entity";
import { PenaltyHistories } from "./domain/entities/penaltyHistories.entity";
import { UseKickboardHistories } from "./domain/entities/useKickboardHistories.entity";
import { UserRepository } from "./domain/user/user.repository";
import { RentalPayModule } from "./domain/rentalPay/rentalPay.module";
import { LocationCheckModule } from "./global/util/locationCheck/locationCheck.module";
import { DiscountModule } from "./domain/discount/discount.module";
import { PenaltyModule } from "./domain/penalty/penalty.module";
import { ExceptionModule } from "./domain/exception/exception.module";
import { CalculatorModule } from './domain/calculator/calculator.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			host: process.env.DB_HOST,
			port: 3306,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [
				AreaCoords,
				AreaPolicies,
				Areas,
				CodeGroups,
				Codes,
				DeerKickboards,
				DiscountHistories,
				Discounts,
				ExceptionHistories,
				Exceptions,
				ForbiddenAreaZones,
				ForbiddenCoords,
				ParkingZones,
				Penalties,
				PenaltyHistories,
				Users,
				UseKickboardHistories,
				UserRepository
			],
			// synchronize: true,
			// synchronize: false,
			keepConnectionAlive: true,
			logging: true
		}),
		UserModule,
		AuthModule,
		LocationCheckModule,
		RentalPayModule,
		DiscountModule,
		PenaltyModule,
		ExceptionModule,
		CalculatorModule
	]
})
export class AppModule {}
