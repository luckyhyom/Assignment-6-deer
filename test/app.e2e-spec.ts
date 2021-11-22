import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	// it('/ user', () => {
	//   return request(app.getHttpServer())
	//     .post('/users/signup')
	//     .send({
	//       user_id: "user01",
	//       password: "1234",
	//       user_name: "테스트유저"
	//     })
	//     .expect(201)
	//     .expect((res) => {
	//       console.log(res.body);
	//     })
	// });

	let token;

	it("/ user", () => {
		return request(app.getHttpServer())
			.post("/users/signin")
			.send({
				user_id: "user01",
				password: "1234"
			})
			.expect((res) => {
				token = res.body.token;
			});
	});

	it("/ (GET) 벌금", () => {
		return request(app.getHttpServer())
			.post("/rentalPay")
			.set("Authorization", `Bearer ${token}`)
			.send({
				"deer_id": 1,
				"use_end_lat": 4.74344340000000,
				"use_end_lng": 5.13235410000000,
				"use_start_at": "2021-11-19 05:27:25.524329",
				"use_end_at": "2021-11-19 06:30:20.768057"
			})
			.expect((res) => {
				console.log(res.body);
			});
	});
	
	it("/ (GET) 할인", () => {
		return request(app.getHttpServer())
			.post("/rentalPay")
			.set("Authorization", `Bearer ${token}`)
			.send({
				"deer_id": 1,
				"use_end_lat": -1.54,
				"use_end_lng": 0.46,
				"use_start_at": "2021-11-19 05:27:25.524329",
				"use_end_at": "2021-11-19 06:30:20.768057"
			})
			.expect((res) => {
				console.log(res.body);
			});
	});
	
});
