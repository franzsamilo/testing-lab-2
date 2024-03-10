import request from "supertest";
import app from "../server";
import { Server } from "http";
import portfinder from "portfinder";

let server: Server;

beforeAll(async () => {
  process.env.TESTING = "true";
  const port = await portfinder.getPortPromise();
  process.env.PORT = port.toString();
  server = app.listen(port);
});

afterAll((done) => {
  server.close(done);
});

describe("(GET /api/pogs/read) testing Read method of CRUD where", () => {
  it("should return all pogs", async () => {
    const res = await request(app).get("/api/pogs/read");

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
