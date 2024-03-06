import request from "supertest";
import { app } from "../../app";

it("return a 201 on successful signup", async () => {
  // if you use signle test then don't need to use await keyword
  // but if you wish to use await or return keyword
  // but if you use multiple test then you have to use await keyword
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "123456" })
    .expect(201); // here expect is an assersion
});

it("return a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test", password: "123456" })
    .expect(400);
});

it("return a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "123" })
    .expect(400);
});

it("return a 400 with missing email or password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({ password: "123456" })
    .expect(400);

  await request(app).post("/api/users/signup").send({}).expect(400);
});

it("disallows duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "123456" })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "123456" })
    .expect(400);
});

it("set a cookie affter successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "123456" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
