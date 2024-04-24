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

describe("(POST /api/pogs/generatePriceChange) - testing Generate Price Change method of CRUD where", () => {
  it("should generate price change successfully", async () => {
    const valid_pogs_id = 22;

    const res = await request(app)
      .post(`/api/pogs/generate-price-change/${valid_pogs_id}`)
      .send({});

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "Price change updated and recorded successfully"
    );
  });

  it("should return 400 for invalid pogs", async () => {
    const invalid_pogs_id = 9999;

    const res = await request(app)
      .post(`/api/pogs/generate-price-change/${invalid_pogs_id}`)
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Invalid inputs");
  });
});
