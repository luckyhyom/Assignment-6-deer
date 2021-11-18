import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserController } from "./domain/user/user.controller";
import { UserService } from "./domain/user/user.service";
import { AuthService } from "./domain/auth/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/entities/user.entity";
import { AuthModule } from "./domain/auth/auth.module";
import { UserModule } from "./domain/user/user.module";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			host: process.env.DB_HOST,
			port: 3306,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [User],
			synchronize: true,
			// synchronize: false,
			keepConnectionAlive: true
		}),
		UserModule,
		AuthModule
	]
})
export class AppModule {}
