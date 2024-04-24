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

describe("(POST /api/wallet/add) - testing add funds to wallet", () => {
    it("should add funds to wallet successfully", async () => {
      const addFundsData = {
        user_id: "google-oauth2|113483673071772833907",
        amount: 100,
      };
  
      const res = await request(app).post("/api/wallet/add").send(addFundsData);
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Funds added successfully");
    });
  });
  
  describe("(POST /api/wallet/minus) - testing subtract funds from wallet", () => {
    it("should return 400 for missing required fields", async () => {
      const subtractFundsData = {
        amount: 50,
      };
  
      const res = await request(app).post("/api/wallet/minus").send(subtractFundsData);
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("error", "Missing required fields");
    });
  });
  
  describe("(GET /api/wallet/read/:user_id) - testing read wallet balance", () => {
    it("should read wallet balance successfully", async () => {
      const userId = "google-oauth2|113483673071772833907";
  
      const res = await request(app).get(`/api/wallet/read/${userId}`);
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("balance");
    });
  });