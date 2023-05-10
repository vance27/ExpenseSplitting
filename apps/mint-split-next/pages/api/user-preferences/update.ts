import { postUpdateUserPreferences } from 'apps/mint-split-next/services/user.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import {
    UserPreferencesForm,
    UserPreferencesFormSchema,
} from '../../user-preferences';
import { NextApiRequest } from 'next';

interface UserPreferencesApiRequest extends NextApiRequest {
    body: UserPreferencesForm;
}

export default async function handler(req: UserPreferencesApiRequest, res) {
    // validate request

    const session = await getServerSession(req, res, authOptions);
    const preferences = req.body;
    const parse = UserPreferencesFormSchema.safeParse(preferences);
    if (!parse.success || !preferences || !session) {
        res.status(400).json({ error: 'Invalid request' });
    }

    const preferencesRes = await postUpdateUserPreferences(
        preferences,
        session
    );

    res.status(200).json(preferencesRes);
}
