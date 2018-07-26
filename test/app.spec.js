const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const request = require('supertest');

const app = require('../server');

describe('Verify GET request', () => {
  it('should return 200 GET request', (done) => {
    request(app)
    .get('/products')
    .set('Accept', 'text/plain')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(done);
  });
});

describe('TDD test /endpoint', () => {
  it('should return a success json object with true', (done)=>{
    request(app)
    .get('/endpoint')
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/ )
    .expect({success: true})
    .end(done)
  });
});

describe('TDD POST /products', () => {
  it('should create new endpoint record', (done)=>{
    request(app)
    .post('/products')
    .type('form')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({name: 'special', price: 3, inventory: 300})
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(res => {
      return (res.body.id && typeof res.body.id === 'number');
    })
    .end(done)
  });
});