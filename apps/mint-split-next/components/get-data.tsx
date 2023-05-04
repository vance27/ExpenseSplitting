import { Button } from "@mui/material";
import { ReactElement, useState } from "react";
import { getUsers, getTransaction } from "../services/transaction.service";

function GetData(): ReactElement {
    const [users, setUsers] = useState([]);
    const [transaction, setTransaction] = useState<any>(null);
    const getUsersLocal = async () => {
        const users = await getUsers();
        setUsers(users);
    };

    const getTransactionLocal = async () => {
        const transaction = await getTransaction({ id: '1' });
        setTransaction(transaction);
    };
    return (
        <>
            <div>GetData</div>
            <Button variant="contained" onClick={getUsersLocal}>
                Get Users {users.length}
            </Button>
            <Button variant="contained" onClick={getTransactionLocal}>
                Get Transaction
            </Button>
            {users.length ? (
                <ul>
                    {users.map((user: any) => (
                        <li key={user.id}>
                            Id: {user.id}, Name: {user.name}, Email:
                            {user.email}
                        </li>
                    ))}
                </ul>
            ) : null}
            {transaction ? (
                <ul>
                    <li key={transaction.id}>
                        Id: {transaction.id}, Title: {transaction.title}, Notes:
                        {transaction.notes}, UserId:
                        {transaction.userId}
                    </li>
                </ul>
            ) : null}
        </>
    );
}

export default GetData;
