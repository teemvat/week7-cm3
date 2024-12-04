const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

beforeAll(async () => {
    await User.deleteMany({});
}
);

describe("User routes", () => {
    describe("POST /api/users/signup", () => {
        it("should signup a new user with valid credentials", async () => {
            const userData = {
                name: "Raikka Pulkkinen",
                username: "raicca",
                password: "asdASD123!",
                phone_number: "123-456-7890",
                gender: "yes",
                date_of_birth: "1990-01-01",
                membership_status: "Pineapple",
                address: "123 Main St, City, State 12345",
                profile_picture: "https://example.com/profile.jpg",
            };

            const result = await api.post("/api/users/signup").send(userData);

            expect(result.status).toBe(201);
            //expect(result.body).toHaveProperty("token");
        });

        it("should return an error with invalid credentials", async () => {
            const userData = {
                name: "Raikka Pulkkinen",
                username: "raicca",
                password: "s4laSANA!",
                phone_number: "123-456-7890",
                gender: "yes",
                date_of_birth: "1990-01-01",
                membership_status: "Pineapple",
                address: "123 Main St, City, State 12345",
                profile_picture: "https://example.com/profile.jpg",
            };

            const result = await api.post("/api/users/signup").send(userData);

            expect(result.status).toBe(400);
            expect(result.body).toHaveProperty("error");
        })
    });

    describe("POST /api/users/login", () => {
        it("should login a user with valid credentials", async () => {
            const userData = {
                username: "raicca",
                password: "asdASD123!",
            };

            const result = await api.post("/api/users/login").send(userData);

            expect(result.status).toBe(200);
            //expect(result.body).toHaveProperty("token");

        });

        it("should return an error with invalid credentials", async () => {
            const userData = {
                username: "raicca",
                password: "salsa",
            };

            const result = await api.post("/api/users/login").send(userData);

            expect(result.status).toBe(400);
            expect(result.body).toHaveProperty("error");
        })
    }
    )
});