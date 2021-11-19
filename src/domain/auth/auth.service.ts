import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../user/user.repository";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Users } from "../entities/user.entity";

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService
	) {}

	async validateUser(user_id: string, password: string) {
		const user = await this.userRepository.findUser(user_id);
		if (
			!user ||
			(user && !(await bcrypt.compare(password, user.password)))
		) {
			throw new UnauthorizedException();
		}
		return user;
	}

	makeToken(user: Users) {
		const payload = { user_id: user.user_id, user_name: user.user_name };
		return this.jwtService.sign(payload);
	}
}
