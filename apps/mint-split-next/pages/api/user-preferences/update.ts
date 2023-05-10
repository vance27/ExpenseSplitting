import { postUpdateUserPreferences } from 'apps/mint-split-next/services/user.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import {
    UserPreferencesForm,
    UserPreferencesFormSchema,
} from '../../user-preferences';
import { NextApiRequest } from 'next';
import { zu } from 'zod_utilz';

interface UserPreferencesApiRequest extends NextApiRequest {
    body: UserPreferencesForm;
}

export default async function handler(req: UserPreferencesApiRequest, res) {
    // validate request

    const session = await getServerSession(req, res, authOptions);
    const preferencesSchema = zu.stringToJSON();
    const preferences = preferencesSchema.parse(req.body);
    const parse = UserPreferencesFormSchema.safeParse(preferences);
    if (!parse.success && preferences) {
        res.status(400).json({ error: parse.error });
    }

    const id = await postUpdateUserPreferences(preferences, session);
    res.status(200).json({ id });
}
