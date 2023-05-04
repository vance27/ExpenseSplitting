export async function getTransaction({ id }: { id: string }): Promise<any> {
    const data = await fetch(`http://localhost:3333/transactions/${id}`);
    return data.json();
}

export async function getUsers(): Promise<any> {
    const data = await fetch(`http://localhost:3333/users`);
    return data.json();
}