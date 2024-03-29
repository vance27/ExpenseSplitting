import { User } from '@prisma/client';
import prisma from '../../prisma/prisma';
import {
    UserPreferencesForm,
    UserPreferencesFormSchema,
} from '../pages/user-preferences';
import { Session } from 'next-auth';


export async function getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users ?? [];
}

export async function getFriendRequests(id: string): Promise<any> {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            FriendRequestSent: {
                include: {
                    receiver: true,
                },
            },
        },
    });
    const requestedUsers = user?.FriendRequestSent.map((f) => f.receiver);
    console.log(requestedUsers);
    return requestedUsers ?? [];
}

export async function getFriendRequestsReceived(id: string): Promise<any> {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            FriendRequestReceived: {
                include: {
                    sender: true,
                },
            },
        },
    });
    const senderUsers = user?.FriendRequestReceived.map((f) => f.sender);
    console.log(senderUsers);
    return senderUsers ?? [];
}


export async function getAuthorizedUsers(id: string): Promise<User[]> {
    const users = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            authorizedUsers: true,
        },
    });
    return users?.authorizedUsers ?? [];
}

export async function getUserPreferences(id: string): Promise<any> {
    const preferences = await prisma.userPreferences.findUnique({
        where: {
            userId: id,
        },
    });
    return preferences ?? undefined;
}

export async function postUpdateUserPreferences(
    preferences: UserPreferencesForm,
    session: Session | null
): Promise<any> {
    const sesPref = session?.userPreferences;
    const res = await prisma.userPreferences.upsert({
        where: {
            id: sesPref?.id ?? -1,
        },
        create: {
            splittingUserId: preferences.splittingUserId ?? '',
            currency: preferences.currency ?? 'usd',
            language: preferences.language ?? 'en',
            timezone: preferences.timezone ?? 'America/Chicago',
            theme: preferences.theme ?? 'light',
            dateFormat: preferences.dateFormat ?? 'MM/dd/yyyy',
            timeFormat: preferences.timeFormat ?? 'hh:mm a',
            preferredSort: preferences.preferredSort ?? 'date',
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            userId: session?.id ?? '', // TODO: throw error in this case
        },
        update: {
            splittingUserId:
                preferences.splittingUserId ?? sesPref?.splittingUserId,
            currency: preferences.currency ?? sesPref?.currency,
            language: preferences.language ?? sesPref?.language,
            timezone: preferences.timezone ?? sesPref?.timezone,
            theme: preferences.theme ?? sesPref?.theme,
            dateFormat: preferences.dateFormat ?? sesPref?.dateFormat,
            timeFormat: preferences.timeFormat ?? sesPref?.timeFormat,
            preferredSort: preferences.preferredSort ?? sesPref?.preferredSort,
            updatedAt: new Date().toISOString(),
        },
    });
    return res ?? undefined;
}
