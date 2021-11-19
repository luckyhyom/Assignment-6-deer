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

	it("/ (GET)", () => {
		return request(app.getHttpServer())
			.post("/rentalPay")
			.set("Authorization", `Bearer ${token}`)
			.send({
				deer_id: 1,
				use_end_lat: 6.33830680279383,
				use_end_lng: 0.580770335748556,
				use_start_at: Date.now() - 1,
				use_end_at: Date.now()
			})
			.expect((res) => {
				console.log(res.body);
			});
	});
	// it('/ (GET)', () => {
	//   return request(app.getHttpServer())
	//     .post('/rentalPay')
	//     .send({

	//     })
	//     .expect(200)
	//     .expect('Hello World!');
	// });
});
