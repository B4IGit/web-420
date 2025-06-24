const app = require('../src/app');
const request = require('supertest');

describe('In-N-Out, JSON Web Server', () => {
  it ('should return an array of books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);

    res.body.forEach((book)  => {
      expect(book).toHaveProperty('id');
      expect(book).toHaveProperty('title');
      expect(book).toHaveProperty('author');
    });
  });

  it ('should return a single book', async () => {
    const res = await request(app).get('/api/books/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('title', 'The Fellowship of the Ring');
    expect(res.body).toHaveProperty('author', 'J.R.R. Tolkien');
  });

  it ('should return a 400 error of the id is not a number', async () => {
    const res = await request(app).get('/api/books/abc');

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Input must be a number');
  });
});