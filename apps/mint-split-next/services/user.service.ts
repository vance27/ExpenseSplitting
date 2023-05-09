import { User } from '@prisma/client';
import prisma from '../prisma/prisma';

export async function getAuthorizedUsers(email: string): Promise<User[]> {
    const users = await prisma.user.findUnique({
        where: {
            id: email,
        },
        include: {
            authorizedUsers: true,
        },
    });
    return users?.authorizedUsers ?? [];
}
