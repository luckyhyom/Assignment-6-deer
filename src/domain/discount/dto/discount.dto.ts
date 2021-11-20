import { IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class DiscountDto {
	@IsString()
	@IsNotEmpty()
	user_id!: string;

	@IsDecimal()
	@IsNotEmpty()
	use_end_lat!: number;

	@IsDecimal()
	@IsNotEmpty()
	use_end_lng!: number;
}
// 변수명이 저게 맞나요 맞는거 같아요 일단 위도 경도랑 id.. 조아요
// 저희 근데 DTO에 뭐들아가죠? lat, lng, user_id ??????
// 할인할 때 필요한 게 뭘까요 뭘가져와야 하지
// 계산은 여기서 하는게 아니니까 lat, lng, user_id 정도만 있어도 되지 않나요
// 그럼 일단 적어볼게요
// 그럼 이렇게 해놓고 넘어가죠 아니면 수정하면 되니까
