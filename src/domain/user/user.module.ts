import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { User } from "../entities/user.entity";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
	imports: [TypeOrmModule.forFeature([User, UserRepository]), AuthModule],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
