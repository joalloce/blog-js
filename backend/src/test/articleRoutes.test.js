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

describe("Article API", () => {
  let articleId;

  it("should create a new article", async () => {
    const res = await request(server)
      .post("/api/articles/")
      .send({
        title: "title",
        content: "content",
        author: 1,
        tagIds: [1, 2],
      });
    articleId = res.body.data.id;
    expect(res.statusCode).toEqual(201);
  });

  it("should show all articles", async () => {
    const res = await request(server).get("/api/articles");
    expect(res.statusCode).toEqual(200);
  });

  it("should show an article", async () => {
    const res = await request(server).get(`/api/articles/${articleId}`);
    expect(res.statusCode).toEqual(200);
  });

  it("should update an article", async () => {
    const res = await request(server)
      .patch(`/api/articles/${articleId}`)
      .send({
        title: "title1",
        content: "content1",
        tagIds: [3, 4],
      });
    expect(res.statusCode).toEqual(200);
  });

  it("should delete an article", async () => {
    const res = await request(server).delete(`/api/articles/${articleId}`);
    expect(res.statusCode).toEqual(204);
  });
});
