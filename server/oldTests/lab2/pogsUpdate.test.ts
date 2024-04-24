import request from "supertest";
import app from "../../server";
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

describe("(PUT /api/pogs/update/:id) - testing Update method of CRUD where", () => {
  it("should update a Pog", async () => {
    const updatedPog = {
      pogs_name: "Updated Pog",
      ticker_symbol: "UPOG",
      price: 200,
      color: "#000000",
      user_id: 1,
    };
    const pog_id = 38;

    const res = await request(app)
      .put(`/api/pogs/update/${pog_id}`)
      .send(updatedPog);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Pog updated successfully");
  });

  it("should return 400 for invalid data", async () => {
    const invalidPog = {
      pogs_name: "Invalid Pog",
      ticker_symbol: "IPOG",
      price: "not a number",
      color: "#000000",
      user_id: 1,
    };
    const pog_id = 1;

    const res = await request(app)
      .put(`/api/pogs/update/${pog_id}`)
      .send(invalidPog);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });
});
