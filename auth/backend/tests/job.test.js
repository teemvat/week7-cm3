const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Job = require("../models/jobModel");
const User = require("../models/userModel");

const jobs = [
    {
        title: "Software Engineer",
        type: "Full-time",
        description: "Develop new features for Google products.",
        company: {
            name: "Google",
            contactEmail: "gmail@gmail.com",
            contactPhone: "123-456-7890",
            website: "https://www.google.com",
        },
        location: "Mountain View, CA",
        salary: 120000,
        postedDate: new Date(),
        status: "open",
        applicationDeadline: new Date(),
        requirements: ["Bachelor's degree in Computer Science", "Experience with JavaScript"],
    },
    {
        title: "Product Manager",
        type: "Full-time",
        description: "Manage the product development process.",
        company: {
            name: "Facebook",
            contactEmail: "facebook@facebook.com",
            contactPhone: "123-456-7890",
            website: "https://www.facebook.com",
        },
        location: "Menlo Park, CA",
        salary: 150000,
        postedDate: new Date(),
        status: "open",
        applicationDeadline: new Date(),
        requirements: ["Bachelor's degree in Business Administration", "Experience with product management"],
    },
];

let token = null;

beforeAll(async () => {
    await User.deleteMany({});
    const result = await api.post("/api/users/signup").send({
      name: "John Doe",
      username: "john_doe",
      password: "R3g5T7#gh",
      phone_number: "1234567890",
      gender: "Male",
      date_of_birth: "1990-01-01",
      membership_status: "Inactive",
      address: "123 Main St, City, State 12345",
      profile_picture: "https://example.com/profile.jpg",
    });
    token = result.body.token;
  });

describe("Given there are initially some jobs saved", () => {
    beforeEach(async () => {
        await Job.deleteMany({});
        await Promise.all([
            api
                .post("/api/jobs")
                .set("Authorization", "bearer " + token)
                .send(jobs[0]),
            api
                .post("/api/jobs")
                .set("Authorization", "bearer " + token)
                .send(jobs[1]),
        ]);
    });

    it("should return all jobs as JSON when GET /api/jobs is called", async () => {
        await api
            .get("/api/jobs")
            .set("Authorization", "bearer " + token)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    it("should create one job when POST /api/jobs is called", async () => {
        const newJob = {
            title: "Data Scientist",
            type: "Full-time",
            description: "Analyze data to provide insights for business decisions.",
            company: {
                name: "Amazon",
                contactEmail: "amazon@amazon.com",
                contactPhone: "123-456-7890",
                website: "https://www.amazon.com",
            },
            location: "Seattle, WA",
            salary: 130000,
            postedDate: new Date(),
            status: "open",
            applicationDeadline: new Date(),
            requirements: ["Bachelor's degree in Data Science", "Experience with Python"],
        };

        await api
            .post("/api/jobs")
            .set("Authorization", "bearer " + token)
            .send(newJob)
            .expect(201);
    });

    it("should return one job by ID when GET /api/jobs/:id is called", async () => {
        const job = await Job.findOne();
        await api
            .get("/api/jobs/" + job._id)
            .set("Authorization", "bearer " + token)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    it("should update one job by ID when PUT /api/jobs/:id is called", async () => {
        const job = await Job.findOne();
        const updatedJob = {
            title: "Updated Title",
            type: "Updated Type",
            description: "Updated Description",
        };
        const response = await api
            .put(`/api/jobs/${job._id}`)
            .set("Authorization", "bearer " + token)
            .send(updatedJob)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        console.log("Response body:", response.body);

        const updatedJobCheck = await Job.findById(job._id);
        console.log("Updated job:", updatedJobCheck);

        expect(updatedJobCheck.title).toBe(updatedJob.title);
        expect(updatedJobCheck.type).toBe(updatedJob.type);
        expect(updatedJobCheck.description).toBe(updatedJob.description);
    });


    it("should delete one job by ID when DELETE /api/jobs/:id is called", async () => {
        const job = await Job.findOne();
        await api
            .delete("/api/jobs/" + job._id)
            .set("Authorization", "bearer " + token)
            .expect(204);
        const jobCheck = await Job.findById(job._id);
        expect(jobCheck).toBeNull();
    });
});

afterAll(() => {
    mongoose.connection.close();
});
