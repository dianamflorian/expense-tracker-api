import request from 'supertest';
import app from '../src/app';
import { Database } from '../src/database';
import fs from 'fs';
import path from 'path';

const testDbPath = path.resolve(__dirname, '../test_database.sqlite');

beforeAll(async () => {
  process.env.DB_PATH = testDbPath;
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath);
  }
  await Database.close();
  Database.getInstance(testDbPath);
});

afterAll(async () => {
  await Database.close();
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath);
  }
});

describe('Expenses API', () => {
  let createdExpenseId: number;

  it('should create a new expense', async () => {
    const response = await request(app)
      .post('/api/v1/expenses')
      .send({
        title: 'Groceries',
        amount: 45.50,
        category: 'Food',
        date: '2026-06-01',
        notes: 'Weekly supermarket shopping',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Expense created successfully');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.title).toBe('Groceries');
    expect(response.body.data.amount).toBe(45.50);

    createdExpenseId = response.body.data.id;
  });

  it('should retrieve all expenses', async () => {
    const response = await request(app).get('/api/v1/expenses');
    expect(response.status).toBe(200);
    expect(response.body.count).toBeGreaterThan(0);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should retrieve an expense by id', async () => {
    const response = await request(app).get(`/api/v1/expenses/${createdExpenseId}`);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(createdExpenseId);
    expect(response.body.data.title).toBe('Groceries');
  });

  it('should update an expense', async () => {
    const response = await request(app)
      .put(`/api/v1/expenses/${createdExpenseId}`)
      .send({
        amount: 50.00,
        notes: 'Updated groceries amount',
      });

    expect(response.status).toBe(200);
    expect(response.body.data.amount).toBe(50.00);
    expect(response.body.data.notes).toBe('Updated groceries amount');
  });

  it('should delete an expense', async () => {
    const response = await request(app).delete(`/api/v1/expenses/${createdExpenseId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Expense deleted successfully');
  });

  it('should return 404 for non-existent expense', async () => {
    const response = await request(app).get('/api/v1/expenses/99999');
    expect(response.status).toBe(404);
  });
});
