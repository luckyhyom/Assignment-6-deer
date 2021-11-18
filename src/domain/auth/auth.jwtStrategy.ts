import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./dto/jwtPayload.dto";

export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET_KEY
		});
	}

	async validate(payload: any): Promise<JwtPayload> {
		return { user_id: payload.user_id, user_name: payload.user_name };
	}
}
