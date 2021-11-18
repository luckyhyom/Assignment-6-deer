import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { SearchAmountException } from "./exception/SearchAmountException";
import { SearchCursorException } from "./exception/SearchCursorException";
import { SearchDateException } from "./exception/SearchDateException";

export const SearchHistory = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const queryParam = request.query;

		if (
			(queryParam["startDate"] != undefined &&
				queryParam["endDate"] === undefined) ||
			(queryParam["startDate"] === undefined &&
				queryParam["endDate"] != undefined)
		) {
			throw new SearchDateException();
		}

		if (
			queryParam["after"] != undefined &&
			queryParam["before"] != undefined
		) {
			throw new SearchCursorException();
		}

		if (
			(!isNaN(queryParam["minAmount"]) &&
				isNaN(queryParam["maxAmount"])) ||
			(isNaN(queryParam["minAmount"]) && !isNaN(queryParam["maxAmount"]))
		) {
			throw new SearchAmountException();
		}

		if (isNaN(queryParam["minAmount"])) queryParam["minAmount"] = 0;
		if (isNaN(queryParam["maxAmount"])) queryParam["maxAmount"] = 0;
		if (isNaN(queryParam["limit"])) queryParam["limit"] = 10;

		queryParam["limit"] = parseInt(queryParam["limit"]);

		if (queryParam["startDate"] != null && queryParam["endDate"] != null) {
			const start = new Date(queryParam["startDate"]);
			const end = new Date(queryParam["endDate"]);
			queryParam["startDate"] = new Date(
				start.getTime() - start.getTimezoneOffset() * 60000
			).toISOString();
			queryParam["endDate"] = new Date(
				end.getTime() - end.getTimezoneOffset() * 60000
			).toISOString();
		}

		return queryParam;
	}
);
