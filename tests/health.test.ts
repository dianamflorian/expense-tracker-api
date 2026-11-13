import request from 'supertest';
import app from '../src/app';

describe('Health Check API', () => {
  it('should return status UP', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('UP');
    expect(response.body.service).toBe('expense-tracker-api');
  });
});
