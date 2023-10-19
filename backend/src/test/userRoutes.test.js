import request from "supertest";
import app from "#root/server/startServer";

const port = 8801;
let server;

beforeAll(async () => {
  server = app.listen(port);
});

afterAll(async () => {
  server.close();
});

describe("User API", () => {
  let userId;

  it("should create a new user", async () => {
    const res = await request(server).post("/api/users/").send({
      name: "Bob",
      email: "bob@doe.com",
      password: "12345678",
    });
    userId = res.body.data.id;
    expect(res.statusCode).toEqual(201);
  });

  it("should show all users", async () => {
    const res = await request(server).get("/api/users");
    expect(res.statusCode).toEqual(200);
  });

  it("should show an user", async () => {
    const res = await request(server).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
  });

  it("should update an user", async () => {
    const res = await request(server).patch(`/api/users/${userId}`).send({
      name: "Bob1",
      email: "bob1@doe.com",
      password: "123456789",
    });
    expect(res.statusCode).toEqual(200);
  });

  it("should delete an user", async () => {
    const res = await request(server).delete(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(204);
  });
});
