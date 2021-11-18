import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "./dto/createUser.dto";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async findUser(user_id: string) {
		console.log(user_id);
		console.log(await this.findOne({ user_id }));
		return await this.findOne({ user_id });
	}

	async createUser(createUserDto: CreateUserDto) {
		const newUser = new User();
		newUser.user_id = createUserDto.user_id;
		newUser.password = await bcrypt.hash(createUserDto.password, 10);
		newUser.user_name = createUserDto.user_name;

		return await this.save(newUser);
	}
}
