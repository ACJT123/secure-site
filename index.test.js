const request = require("supertest");
const app = require("./index");

// Define expected responses for each environment
const expectedResponses = {
  development: "Hello World from development",
  staging: "Hello World from staging",
  production: "Hello World from production",
};

test("GET /", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(200);

  // Get the expected response based on the current NODE_ENV
  const expectedResponse = expectedResponses[process.env.NODE_ENV];

  // Assert that the response matches the expected response for the current environment
  if (expectedResponse) {
    expect(response.text).toBe(expectedResponse);
  } else {
    throw new Error(`Unexpected NODE_ENV: ${process.env.NODE_ENV}`);
  }
});
