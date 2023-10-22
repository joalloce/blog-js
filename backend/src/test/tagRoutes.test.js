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

describe("Tag API", () => {
  let tagId;

  it("should create a new tag", async () => {
    const res = await request(server).post("/api/tags/").send({
      content: "tag",
    });
    tagId = res.body.data.id;
    expect(res.statusCode).toEqual(201);
  });

  it("should show all tags", async () => {
    const res = await request(server).get("/api/tags");
    expect(res.statusCode).toEqual(200);
  });

  it("should show a tag", async () => {
    const res = await request(server).get(`/api/tags/${tagId}`);
    expect(res.statusCode).toEqual(200);
  });

  it("should update a tag", async () => {
    const res = await request(server).patch(`/api/tags/${tagId}`).send({
      content: "tag1",
    });
    expect(res.statusCode).toEqual(200);
  });

  it("should delete a tag", async () => {
    const res = await request(server).delete(`/api/tags/${tagId}`);
    expect(res.statusCode).toEqual(204);
  });
});
