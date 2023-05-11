import { trpc } from '../utils/trpc';

export function Index() {
    const hello = trpc.hello.useQuery({ text: 'world' });

    return (
        <>
            <div>Welcome to mint split. {hello.data?.greetings}</div>
        </>
    );
}

export default Index;
