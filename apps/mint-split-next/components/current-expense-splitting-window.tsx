import { useSession } from 'next-auth/react';
import { ReactElement } from 'react';

function CurrentExpenseSplittingWindow({
    props,
}: {
    props: any;
}): ReactElement {
    // const [transactions, setTransactions] = useState([]);
    const { data: session, status } = useSession();

    // if (!props.transactions) {
    // }

    return (
        <div>
            Current Expense Splitting Window
            <div>Transactions Display</div>
            {/* {session?.user?.currentTransactions.map((transaction: any) => (
                <div key={transaction.id}>
                    Id: {transaction.id}, Name: {transaction.title}, Amount:
                    {`$${transaction.price
                        .toString()
                        .substring(
                            0,
                            transaction.price.toString().length - 2
                        )}.${transaction.price.toString().slice(-2)}`}
                </div>
            ))} */}
            {session?.user?.authorizedUserTransactions.map(
                (transaction: any) => (
                    <div>
                        Id: {transaction.id}, Name: {transaction.title}, Amount:
                        {transaction.price}
                    </div>
                )
            )}
        </div>
    );
}

export default CurrentExpenseSplittingWindow;
