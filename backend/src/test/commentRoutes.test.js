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
  let commentId;

  it("should create a new comment", async () => {
    const res = await request(server).post("/api/comments/").send({
      articleId: 1,
      author: 1,
      content: "content",
    });
    commentId = res.body.data.id;
    expect(res.statusCode).toEqual(201);
  });

  it("should show all comments", async () => {
    const res = await request(server).get("/api/comments");
    expect(res.statusCode).toEqual(200);
  });

  it("should show a comment", async () => {
    const res = await request(server).get(`/api/comments/${commentId}`);
    expect(res.statusCode).toEqual(200);
  });

  it("should update a comment", async () => {
    const res = await request(server).patch(`/api/comments/${commentId}`).send({
      content: "content1",
    });
    expect(res.statusCode).toEqual(200);
  });

  it("should delete a comment", async () => {
    const res = await request(server).delete(`/api/comments/${commentId}`);
    expect(res.statusCode).toEqual(204);
  });
});
