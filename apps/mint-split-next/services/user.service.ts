import { User } from '@prisma/client';
import prisma from '../prisma/prisma';

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
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            userPreferences: true,
        },
    });
    return user?.userPreferences ?? undefined;
}