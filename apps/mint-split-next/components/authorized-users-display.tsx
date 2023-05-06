import { ReactElement } from 'react';
import CurrentExpenseSplittingWindow from './current-expense-splitting-window';
import { useSession } from 'next-auth/react';
function AuthorizedUsersDisplay(): ReactElement {
    const { data: session, status } = useSession();

    return (
        <div>
            Authorized Users
            {session?.authorizedUsers?.map((user: any) => (
                <div key={user.id}>
                    Id: {user.id}, Name: {user.name}, Email: {user.email}
                </div>
            ))}
            <CurrentExpenseSplittingWindow />
        </div>
    );
}

export default AuthorizedUsersDisplay;
