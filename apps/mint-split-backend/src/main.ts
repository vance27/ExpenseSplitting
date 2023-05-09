/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { join } from 'path';
import * as cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(cors.default());
app.use(express.json());

app.get('/users', async (_, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.get('/transactions/:id', async (req, res) => {
    const id = req.params.id;
    const transactions = await prisma.transaction.findUnique({
        where: {
            id: +id,
        },
    });
    res.json(transactions);
});

// Start Auth0
app.use(express.static(join(__dirname, 'public')));

app.get('/auth_config.json', (_, res) => {
    res.sendFile(join(__dirname, 'public', 'auth_config.json'));
});

app.get('/', (_, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});
// end Auth0

// app.post('/api/login', (_, res) => {
//     res.send({ token: '1234567890' });
// });

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
