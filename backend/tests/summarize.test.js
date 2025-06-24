// Load environment variables
require('dotenv').config({ path: './.env' }); 

// Import supertest for making HTTP requests to the Express app
const request = require('supertest');
const app = require('../app'); 

// Test suite for the /api/summarize endpoint
describe('POST /api/summarize', () => {
  it('should return a summary for valid input', async () => {
    const res = await request(app)
      .post('/api/summarize')
      .send({ text: 'The Moon is Earth’s only natural satellite.' });         

    // Assertions
    expect(res.statusCode).toBe(200);
    expect(res.body.summary).toBeDefined();
    expect(typeof res.body.summary).toBe('string');
  });
});
