import { ReactElement } from 'react';
import CurrentExpenseSplittingWindow from './current-expense-splitting-window';
import { useSession } from 'next-auth/react';


function AuthorizedUsersDisplay(): ReactElement {
    return (
        <div>
            Authorized Users
            {/* <CurrentExpenseSplittingWindow transactions= /> */}
        </div>
    );
}

export default AuthorizedUsersDisplay;
