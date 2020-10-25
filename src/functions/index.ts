import * as functions from 'firebase-functions';
import next from 'next';
const path = require('path');
const cors = require('cors');
const express = require('express');

import { NextApiRequest, NextApiResponse } from 'next';

import hello from './hello';

// Declare HTTP Request Function for Next.js App
const app = next({
  dev: false,
  conf: {
    distDir: `${path.relative(process.cwd(), __dirname)}/.next`,
  },
});
const handle = app.getRequestHandler();

export const nextApp = functions.https.onRequest((req: any, res: any) => {
  return app.prepare().then(() => handle(req, res));
});

// APIのレスポンス用関数
const sendResponse = (
  response: {
    send: (arg0: {
      statusCode: any;
      headers: { 'Access-Control-Allow-Origin': string };
      body: string;
    }) => void;
  },
  statusCode: number,
  body: any,
) => {
  response.send({
    statusCode,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(body),
  });
};

// Declare HTTP Function for API request
const server = express();
server.use(cors({ origin: true }));
// getリクエストを作成。fetchUsers関数の実行結果をレスポンスのbodyとして返す
server.get('/v1/hello', async (req: NextApiRequest, res: NextApiResponse) =>
  sendResponse(res, 200, await hello(req, res)),
);

export const api = functions.https.onRequest(server);
