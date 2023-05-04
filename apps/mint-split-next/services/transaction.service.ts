import { GetStaticProps } from 'next';
import prisma from '../prisma/prisma';

// export const getStaticProps: GetStaticProps = async () => {
//     const users = await prisma.user.findMany();
//     return {
//         props: { users },
//         revalidate: 30,
//     };
// };

export async function getTransaction({ id }: { id: string }): Promise<any> {
    const data = await fetch(`http://localhost:3333/transactions/${id}`);
    return data.json();
}

export async function getUsers(): Promise<any> {
    const data = await fetch(`http://localhost:3333/users`);
    return data.json();
}
