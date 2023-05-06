import { ReactElement } from 'react';

function CurrentExpenseSplittingWindow({
    transactions,
}: {
    transactions: any[];
}): ReactElement {
    console.log('transactions in expense splitting window', transactions);
    return (
        <div>
            Current Expense Splitting Window
            <div>Transactions Display</div>
            {transactions?.map((transaction: any, index: number) => (
                <div>
                    Transaction {index}: {transaction.id}{' '}
                </div>
            ))}
        </div>
    );
}

export default CurrentExpenseSplittingWindow;
