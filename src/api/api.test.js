import request from 'supertest';
import app from '../app';

describe('GET /', () => {
  it('should render properly', async () => {
    await request(app).get('/').expect(200);
  });
});

describe('GET /api/topic/list/1', () => {
  it('should fetch a blank list of topics', async () => {
    const response = await request(app).get('/api/topic/list/1');
    const { success, result } = response.body;
    expect(success).toBe(true);
    expect(result.length).toBe(0);
  });
});

describe('POST /api/topic/create', () => {
  it('should successfully create a topic and list it correctly', async () => {
    const response = await request(app)
      .post('/api/topic/create')
      .type('form')
      .send({ message: 'Hello' })
      .set('Accept', /application\/json/);
    const { success, result } = response.body;
    expect(success).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(1);
    expect(result[0].message).toBe('Hello');
    expect(result[0].score).toBe(0);
  });

  it('should successfully create a second topic and list it correctly', async () => {
    const response = await request(app)
      .post('/api/topic/create')
      .type('form')
      .send({ message: 'Hello2', page: 1 })
      .set('Accept', /application\/json/);
    const { success, result } = response.body;
    expect(success).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0].id).toBe(1);
    expect(result[0].message).toBe('Hello');
    expect(result[0].score).toBe(0);
    expect(result[1].id).toBe(2);
    expect(result[1].message).toBe('Hello2');
    expect(result[1].score).toBe(0);
  });
});

describe('POST /api/topic/upvote', () => {
  it('should upvote second topic and shift it to the front of the array', async () => {
    const response = await request(app)
      .post('/api/topic/upvote')
      .type('form')
      .send({ id: 2, page: 1 })
      .set('Accept', /application\/json/);
    const { success, result } = response.body;
    expect(success).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0].id).toBe(2);
  });
});

describe('POST /api/topic/downvote', () => {
  it('should downvote second topic and shift it to the back of the array', async () => {
    let response = await request(app)
      .post('/api/topic/downvote')
      .type('form')
      .send({ id: 2, page: 1 })
      .set('Accept', /application\/json/);
    response = await request(app)
      .post('/api/topic/downvote')
      .type('form')
      .send({ id: 2, page: 1 })
      .set('Accept', /application\/json/);
    const { success, result } = response.body;
    expect(success).toBe(true);
    expect(result.length).toBe(2);
    expect(result[1].id).toBe(2);
  });
});
