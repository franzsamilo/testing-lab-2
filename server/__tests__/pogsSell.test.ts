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

describe("(POST /api/pogs/sell) - testing Sell method of CRUD where", () => {
  it("should sell a Pog successfully", async () => {
    const sellPogData = {
      user_id: "google-oauth2|113483673071772833907",
      pogs_id: 22,
      stock: 1,
    };

    const res = await request(app).post("/api/pogs/sell").send(sellPogData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Pogs sold successfully");
  });

  it("should return 400 for insufficient stock to", async () => {
    const sellPogData = {
      user_id: "google-oauth2|113483673071772833907",
      pogs_id: 23,
      stock: 1000,
    };

    const res = await request(app).post("/api/pogs/sell").send(sellPogData);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Insufficient stock");
  });

  it("should return 400 for missing required fields", async () => {
    const sellPogData = {
      user_id: "google-oauth2|113483673071772833907",
    };

    const res = await request(app).post("/api/pogs/sell").send(sellPogData);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Missing required fields");
  });
});
