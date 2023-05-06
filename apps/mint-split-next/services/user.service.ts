import prisma from '../prisma/prisma';

export async function getAuthorizedUsers(email: string) {
    console.log(`email is ${email}`);
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
