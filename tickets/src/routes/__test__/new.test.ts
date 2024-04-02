import request from 'supertest';
import { app } from '../../app';

it('has route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be access if user is signed in', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

it('return a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .send({ title: '', price: 20 })
    .expect(400);

  await request(app).post('/api/tickets').send({ price: 20 }).expect(400);
});

it('returns an error if invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .send({ title: 'ticket 1', price: -10 })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .send({ title: 'title 1' })
    .expect(400);
});

it('creates a ticket with valid input', async () => {});
