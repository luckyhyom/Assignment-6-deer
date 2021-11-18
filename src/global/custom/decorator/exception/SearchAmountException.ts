import { HttpException } from "@nestjs/common";
import { ErrorCode } from "src/global/common/ErrorCode";

export class SearchAmountException extends HttpException {
	constructor() {
		super(ErrorCode.SearchAmount, ErrorCode.SearchAmount.StatusCode);
	}
}
