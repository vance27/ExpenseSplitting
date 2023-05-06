import { Container } from '@mui/material';
import { useSession } from 'next-auth/react';

function AuthContainer(props: any) {
    const { data: session, status } = useSession();
    return session ? <Container>{props.children}</Container> : null;
}

export default AuthContainer;
