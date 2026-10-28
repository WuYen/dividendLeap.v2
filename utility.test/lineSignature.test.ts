jest.mock('../utility/config', () => ({
  __esModule: true,
  default: { LINE_CHANNEL_SECRET: 'test-secret', LINE_CHANNEL_ACCESS_TOKEN: 'test-token' },
}));
import express from 'express';
import * as crypto from 'crypto';
import { lineBotHelper } from '../utility/lineBotHelper';

test('verifies original bytes including whitespace, not reserialized JSON', () => {
  const rawBody = Buffer.from('{ "events": [] }');
  const signature = crypto.createHmac('sha256', 'test-secret').update(rawBody).digest('base64');
  const req = { rawBody, body: { events: [] }, get: () => signature } as unknown as express.Request;
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as express.Response;
  const next = jest.fn();
  lineBotHelper.verifySignature(req, res, next);
  expect(next).toHaveBeenCalledTimes(1);
  expect(res.status).not.toHaveBeenCalled();
});

test('rejects an unsigned caller even in development', () => {
  const before = process.env.NODE_ENV;
  process.env.NODE_ENV = 'development';
  try {
    const req = { rawBody: Buffer.from('{}'), get: () => undefined } as unknown as express.Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as express.Response;
    const next = jest.fn();
    lineBotHelper.verifySignature(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  } finally {
    process.env.NODE_ENV = before;
  }
});
