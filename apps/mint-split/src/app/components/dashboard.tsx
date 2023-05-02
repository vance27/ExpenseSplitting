import { Box, Button } from '@mui/material';
import { ReactElement, useState } from 'react';

export const Dashboard = (): ReactElement => {
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const response = await fetch('http://localhost:3333/users');
        const users = await response.json();
        console.log(users);
        users.length ? setUsers(users) : setUsers([]);
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <div>Dashboard</div>
            <Button variant="contained" onClick={getUsers}>
                Get Users {users.length}
            </Button>
            {users.length ? (
                <ul>
                    {users.map((user: any) => (
                        <li key={user.id}>
                            Id: {user.id}, Name: {user.name}, Email:{' '}
                            {user.email}
                        </li>
                    ))}
                </ul>
            ) : null}
        </Box>
    );
};
