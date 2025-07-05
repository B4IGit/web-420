const app = require('../src/app');
const request = require('supertest');

describe('Chapter 3: API Tests', () => {
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
}); // End chapter 3: API Tests

describe('Chapter 4: API Tests', () => {
  it('should return a 201 status code when adding a new recipe', async () => {
    const res = await request(app).post('/api/books').send({
      id: 99,
      title: 'If It Bleeds',
      author: 'Stephen King',
    });

    expect(res.statusCode).toEqual(201);
  });

  it('should return a 400 status code when adding a new book with missing author', async () => {
    const res = await request(app).post('/api/books').send({
      id: 100,
      title: 'If It Bleeds'
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Bad Request');
  });

  it('should return a 204 status code when deleting a book', async  () => {
    const res = await request(app).delete('/api/books/99');

    expect(res.statusCode).toEqual(204);
  });
}); // End chapter 4: API Tests