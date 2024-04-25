import request from "supertest";
import app from "../server";
import { Server } from "http";
import portfinder from "portfinder";
import poggiesDB from "../db/poggies";
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
describe("(GET /api/assets/read/:user_id) - testing read assets", () => {
  it("should read assets successfully", async () => {
    const userId = "google-oauth2|113483673071772833907";

    const res = await request(app).get(`/api/assets/read/${userId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should return 404 error for non-existent route", async () => {
    const nonExistentRoute = `/api/assets/non-existent-route`;
  
    const res = await request(app).get(nonExistentRoute);
  
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({}); 
  });

  it("should return 500 for internal server error", async () => {
    const userId = "google-oauth2|113483673071772833907";


    poggiesDB.query = jest.fn(() => {
      throw new Error("Database error");
    });

    const res = await request(app).get(`/api/assets/read/${userId}`);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error", "Failed to fetch pogs");
  });
});