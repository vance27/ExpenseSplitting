import { ReactElement, useState } from "react";

function CurrentExpenseSplittingWindow(): ReactElement {
    const [transactions, setTransactions] = useState([]);

    return (
        <div>
            Current Expense Splitting Window
            <div>Transactions Display</div>
            {transactions.length ? (
                <div>Transactions</div>
            ) : (
                <div>No Transactions</div>
            )}
        </div>
    );
};

export default CurrentExpenseSplittingWindow;
