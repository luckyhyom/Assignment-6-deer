import { HttpStatus } from "@nestjs/common";

export class ErrorCode {
	static readonly UnAuth = new ErrorCode(
		HttpStatus.UNAUTHORIZED,
		"인증되지 않은 사용자입니다."
	);
	static readonly BadRequest = new ErrorCode(
		HttpStatus.BAD_REQUEST,
		"잘못된 접근입니다."
	);
	static readonly NotFound = new ErrorCode(
		HttpStatus.NOT_FOUND,
		"요청받은 리소스를 찾을 수 없습니다."
	);
	static readonly Forbidden = new ErrorCode(
		HttpStatus.FORBIDDEN,
		"접근 권한이 없습니다."
	);
	static readonly NotFoundAccount = new ErrorCode(
		HttpStatus.NOT_FOUND,
		"해당 계좌를 찾을 수 없습니다."
	);
	static readonly IncorrectPassword = new ErrorCode(
		HttpStatus.UNAUTHORIZED,
		"계좌 비밀번호를 확인해주세요."
	);
	static readonly UnauthorizedUser = new ErrorCode(
		HttpStatus.NOT_FOUND,
		"아이디나 비밀번호를 확인해주세요."
	);
	static readonly LackOfBalance = new ErrorCode(
		HttpStatus.BAD_REQUEST,
		"잔액이 부족합니다."
	);
	static readonly NewError = new ErrorCode(
		HttpStatus.NOT_FOUND,
		"예상치 못한 에러입니다."
	);
	static readonly DuplicatedUser = new ErrorCode(
		HttpStatus.CONFLICT,
		"중복된 아이디입니다."
	);
	static readonly SearchDate = new ErrorCode(
		HttpStatus.BAD_REQUEST,
		"startDate와 endDate 모두 값이 있어야 합니다."
	);
	static readonly SearchAmount = new ErrorCode(
		HttpStatus.BAD_REQUEST,
		"minAmount와 maxAmount 모두 값이 있어야 합니다."
	);

	static readonly SearchCursor = new ErrorCode(
		HttpStatus.BAD_REQUEST,
		"after와 before 중 하나만 값이 있어야 합니다."
	);
	constructor(
		private readonly statusCode: number,
		public readonly message: string
	) {}

	get StatusCode(): number {
		return this.statusCode;
	}

	get Message(): string {
		return this.message;
	}
}
