import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../entities/user.entity";
import { UserRepository } from "../user/user.repository";
import { JwtStrategy } from "./auth.jwtStrategy";
import { LocalStrategy } from "./auth.localStrategy";
import { AuthService } from "./auth.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [".env"],
			isGlobal: true
		}),
		PassportModule,
		TypeOrmModule.forFeature([Users, UserRepository]),
		JwtModule.register({
			secret: process.env.SECRET_KEY,
			signOptions: { expiresIn: "1D" }
		})
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService]
})
export class AuthModule {}
