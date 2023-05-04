import { ReactElement } from 'react';
import CurrentExpenseSplittingWindow from './current-expense-splitting-window';

function AuthorizedUsersDisplay(props: any): ReactElement {
    return (
        <div>
            Authorized Users
            <CurrentExpenseSplittingWindow />
        </div>
    );
}

export default AuthorizedUsersDisplay;
