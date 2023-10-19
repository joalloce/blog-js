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

describe("Comment API", () => {
  it("should show all comments", async () => {
    const res = await request(server).get("/api/comments");
    expect(res.statusCode).toEqual(200);
  });

  it("should show a comment", async () => {
    const res = await request(server).get("/api/comments/1");
    expect(res.statusCode).toEqual(200);
  });
});
