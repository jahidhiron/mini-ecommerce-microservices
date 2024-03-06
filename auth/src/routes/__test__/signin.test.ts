import request from "supertest";
import { app } from "../../app";

it("return a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({ email: "test", password: "123456" })
    .expect(400);
});

it("return a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "123" })
    .expect(400);
});

it("return a 400 with missing email or password", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com" })
    .expect(400);

  await request(app)
    .post("/api/users/signin")
    .send({ password: "123456" })
    .expect(400);

  await request(app).post("/api/users/signin").send({}).expect(400);
});

it("fails when pass incorect email or password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "123456" })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "test1@test.com", password: "123456" })
    .expect(400);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "12345" })
    .expect(400);
});

it("pass when provide valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "123456" })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "123456" })
    .expect(200);
});

it("set a cookie affter successful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "123456" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "123456" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
