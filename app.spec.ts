import app from "./src/app";
import request from "supertest";

describe("APP", () => {
    it("should calculate the discount", () => {});
    it("should return 200 status", async () => {
        const response = await request(app).get("/").send();
        expect(response.statusCode).toBe(200);
    });
});
