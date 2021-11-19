import { EntityRepository, Repository } from "typeorm";
import { Users } from "../entities/user.entity";
import { CreateUserDto } from "./dto/createUser.dto";
import * as bcrypt from "bcrypt";

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
	async findUser(user_id: string) {
		return await this.findOne({ user_id });
	}

	async createUser(createUserDto: CreateUserDto) {
		const newUser = new Users();
		newUser.user_id = createUserDto.user_id;
		newUser.password = await bcrypt.hash(createUserDto.password, 10);
		newUser.user_name = createUserDto.user_name;

		return await this.save(newUser);
	}
}
