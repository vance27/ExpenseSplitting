import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
    console.log('plaid');
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        return res.status(200);
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}
