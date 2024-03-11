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

describe("(DELETE /api/pogs/delete/:id) - testing Delete method of CRUD where", () => {
  it("should return 404 for non-existent Pog ID", async () => {
    const nonExistentPogId = 9999;

    const res = await request(app).delete(
      `/api/pogs/delete/${nonExistentPogId}`
    );

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error", "Pog not found");
  });

  it("should delete a Pog", async () => {
    const pog_id = 49; // pog_id that exists in the database

    const res = await request(app).delete(`/api/pogs/delete/${pog_id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Pog deleted successfully");
  });
});
