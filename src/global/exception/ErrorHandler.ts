import {
	ArgumentsHost,
	BadRequestException,
	ExceptionFilter,
	ForbiddenException,
	NotFoundException,
	UnauthorizedException
} from "@nestjs/common";
import { DuplicatedUserException } from "src/domain/user/exception/DuplicatedUserException";
import { UnauthorizedUserException } from "src/domain/user/exception/UnauthorizedUserException";
import { ErrorCode } from "../common/ErrorCode";
import { ErrorResponse } from "../common/ErrorResponse";

export class ExceptionHandler implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		console.log(exception);
		if (exception instanceof BadRequestException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.BadRequest));
		} else if (exception instanceof NotFoundException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.NotFound));
		} else if (exception instanceof ForbiddenException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.Forbidden));
		} else if (exception instanceof UnauthorizedException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.UnAuth));
		} else if (exception instanceof DuplicatedUserException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.DuplicatedUser));
		} else if (exception instanceof UnauthorizedUserException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.UnauthorizedUser));
		} else {
			// 에러 처리가 완료되면 다른 오류로 교체해주세요.
			console.log(exception);
			response
				.status(417)
				.json(ErrorResponse.response(ErrorCode.NewError));
		}
	}
}
