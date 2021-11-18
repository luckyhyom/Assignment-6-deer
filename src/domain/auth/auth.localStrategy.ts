import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: "user_id" });
	}

	async validate(user_id: string, password: string) {
		const user = this.authService.validateUser(user_id, password);
		if (!user) {
			return null;
		}
		return user;
	}
}
