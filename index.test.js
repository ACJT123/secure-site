const request = require("supertest");
const app = require("./index");

// test / request
test("GET /", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(200);
  
  console.log(process.env.NODE_ENV);
  expect(response.text).toBe("Hello World from test");
});
