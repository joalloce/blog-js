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
  it("should show all users", async () => {
    const res = await request(server).get("/api/users");
    expect(res.statusCode).toEqual(200);
  });

  it("should show an user", async () => {
    const res = await request(server).get("/api/users/1");
    expect(res.statusCode).toEqual(200);
  });
});
