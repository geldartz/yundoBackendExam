const request = require('supertest');
const expect = require("chai").expect;
const app = require('../server');

describe('User endpoints', () => {
  let token;
  let userID;

  before(async () => {
    // log in and get a token for the tests
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        "username": "Elta.Wiegand63",
        "password": "password"
      });
    token = response.body.token;
  });

  it('should get all users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
     expect(response.body).to.be.an('object');
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        "first_name": "Venus",
        "last_name": "Castillo",
        "address": "Muntinlupa",
        "post_code": "1993",
        "contact": "09174617171",
        "email": "venus@gmail.com",
        "username": "venusname",
        "password": "asdasd123"
      })
      .expect(201);
      userID = response.body.data.id;
    expect(response.body.data.first_name).to.be.equal('Venus');
    expect(response.body.data.last_name).to.be.equal('Castillo');
  });

  it('should update an existing user', async () => {
    const response = await request(app)
      .put('/api/users/'+userID)
      .set('Authorization', `Bearer ${token}`)
      .send({
        "first_name": "Gildartz",
        "last_name": "Castillo",
        "address": "Muntinlupa",
        "post_code": "1993",
        "contact": "09174617171",
        "email": "venus@gmail.com",
        "username": "venusname",
        "password": "asdasd123"
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).to.be.equal("Gildartz has been updated.");
  });

  it('should delete an existing user', async () => {
    const response = await request(app)
      .delete('/api/users/'+userID)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.message).to.be.equal("User has been deleted");
  });
});