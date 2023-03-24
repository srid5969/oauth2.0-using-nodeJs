import * as chai from "chai";
// const chaiHttp = require("chai-http");
import  chaiHttp from "chai-http";


chai.use(chaiHttp);
// import { Response } from 'superagent';
import { expect } from "chai";
import { assert } from "chai";
import { request } from "chai";

describe("Calculator Tests", () => {
  it("should return 5 when 2 is added to 3", () => {
    const result = 2 + 3;
    assert.equal(result, 5);
  });
});
// describe("Login using userName and password", () => {
//   request("'http://localhost:8000'").get("/").end(function(err, res) {
//     expect(res).to.have.status(123);
//   });

// });
it("should make a GET request to the API", () => {
  return chai
    .request("https://example.com")
    .get("/api")
    .then((response) => {
      expect(response).to.have.status(200);
      expect(response.body).to.be.an("object");
    });
});
