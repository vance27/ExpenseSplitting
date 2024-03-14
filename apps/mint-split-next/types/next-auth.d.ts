import { Bank, User } from '@prisma/client';
import { Session } from 'next-auth';

declare module 'next-auth' {
    export interface Session {
        id?: string | null;
        err?: string | null;
        authorizedUsers?: User[];
        userPreferences?: any;
        banks?: Bank[];
    }
}
