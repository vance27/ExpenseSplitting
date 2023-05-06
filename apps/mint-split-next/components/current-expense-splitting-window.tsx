import { useSession } from 'next-auth/react';
import { ReactElement, useState } from 'react';

function CurrentExpenseSplittingWindow(): ReactElement {
    // const [transactions, setTransactions] = useState([]);
    const { data: session, status } = useSession();

    return (
        <div>
            Current Expense Splitting Window
            <div>Transactions Display</div>
            {session?.user?.currentTransactions.map((transaction: any) => (
                <div key={transaction.id}>
                    Id: {transaction.id}, Name: {transaction.name}, Amount:
                    {transaction.amount}
                </div>
            ))}
        </div>
    );
}

export default CurrentExpenseSplittingWindow;
