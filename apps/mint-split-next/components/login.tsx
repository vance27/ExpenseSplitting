import { Box } from '@mui/material';
import { ReactElement, useState } from 'react';
import PropTypes from 'prop-types';
import './login.scss';

async function loginUser(credentials: { username: string; password: string }) {
    return fetch('http://localhost:3333/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

export const Login = ({ setToken }): ReactElement => {
    const [username, setUserName] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const token = await loginUser({
            username: username ?? '',
            password: password ?? '',
        });
        console.log(`token is ${token}`);
        setToken(token);
    };

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <Box sx={{ height: 400, width: '100%' }}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input
                            type="text"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </Box>
        </div>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};
