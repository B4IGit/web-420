const app = require('../src/app');
const request = require('supertest');
const res = require("express/lib/response");




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

describe('Chapter 5: API Tests', () => {
  it('should return a 204 status code when updating a book', async () => {
    const res = await request(app).put('/api/books/1').send({
      title: 'Lord of the Flies',
      author: 'William Golding'
    });

    expect(res.statusCode).toEqual(204);
  });

  it('should return a 400 status code when updating a book with a non-numeric id', async () => {
    const res = await request(app).put('/api/books/foo').send({
      title: 'Test Book',
      author: 'Test Author'
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Input must be a number');
  });

  it('should return a 400 status code when updating a book with a missing title', async () => {
    const res = await request(app).put('/api/books/1').send({
      author: 'test'
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Bad Request');

    const res2 = await request(app).put('/api/books/1').send({
      title: 'Test Title',
      author: 'Test Author',
      extraKey: 'extra'
    });

    expect(res2.statusCode).toEqual(400);
    expect(res2.body.message).toEqual('Bad Request');
  });
}); // End chapter 5: API Tests

describe('Chapter 6: API Tests', () => {
  it('should log a user in and return a 200-status with ‘Authentication successful’ message', async () => {
    const res = await request(app).post('/api/login').send({
      email: 'harry@hogwarts.edu',
      password: 'potter'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Authentication successful');
  });

  it('should return a 401-status code with ‘Unauthorized’ message when logging in with incorrect credentials', async () => {
    const res = await request(app).post('/api/login').send({
      email: 'cedric@hogwarts.edu',
      password: 'wrongpassword'
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  it('should return a 400-status code with ‘Bad Request’ when missing email or password', async () => {
    const res1 = await request(app).post('/api/login').send({ email: 'cedric@hogwarts.edu' });
    const res2 = await request(app).post('/api/login').send({ password: 'diggory' });

    expect(res1.statusCode).toBe(400);
    expect(res1.body.message).toBe('Bad Request');

    expect(res2.statusCode).toBe(400);
    expect(res2.body.message).toBe('Bad Request');
  });
});

describe("Chapter 7: API Tests", () => {
  it("should return a 200 status with 'Security question successfully answered' message", async () => {
    const res = await request(app).post('/api/users/hermione@hogwarts.edu/verify-security-questions').send({
      securityQuestions: [
        {answer: "Crookshanks"},
        {answer: "Hogwarts: A History"},
        {answer: "Wilkins"}
      ],
      newPassword: 'password'
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Security questions successfully answered');
  });

  it("should return a 400 status code with ‘Bad Request’ message when the request body fails ajv validation", async () => {
    const res = await request(app).post("/api/users/hermione@hogwarts.edu/verify-security-questions").send({
      securityQuestions: [
        { answer: "Crookshanks", question: "What is your pet's name?" },
        {  answer: "Hogwarts: A History", myAge: "17"}
      ],
      newPassword: "Password"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Bad Request');
  });

  it("should return a 401 status code with ‘Unauthorized’ message when the security questions are incorrect", async () => {
    const res = await request(app).post("/api/users/hermione@hogwarts.edu/verify-security-questions").send({
      securityQuestions: [
        { answer: "Crookshanks" },
        { answer: "Hogwarts: A History" },
        { answer: "Wrong Answer" }
      ],
      newPassword: "password"
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Unauthorized');
  });
}); // End chapter 7: API Tests