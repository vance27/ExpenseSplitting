/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import * as cors from 'cors';

const app = express();

app.use(cors.default());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (_, res) => {
    res.send({ message: 'Welcome to mint-split-backend!' });
});

app.post('/api/login', (_, res) => {
    res.send({ token: '1234567890' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
