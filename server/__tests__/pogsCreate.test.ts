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

describe("(POST /api/pogs/create) - testing Create method of CRUD where", () => {
  it("should create a new pog", async () => {
    const newPog = {
      pogs_name: "Test Pog",
      ticker_symbol: "TPOG",
      price: 100,
      color: "#FFFFFF",
      user_id: 1,
    };

    const res = await request(app).post("/api/pogs/create").send(newPog);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Pogs created successfully");
  });
});
