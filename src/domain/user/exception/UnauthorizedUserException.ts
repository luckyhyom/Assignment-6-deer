import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "../../../global/common/ErrorCode";

export class UnauthorizedUserException extends HttpException {
	constructor() {
		super(ErrorCode.UnauthorizedUser, HttpStatus.NOT_FOUND);
	}
}
