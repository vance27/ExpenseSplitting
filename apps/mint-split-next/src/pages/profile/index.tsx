import { Button } from '@mui/material';

export default function Profile() {
    const onClick = () => {
        console.log('clicked');
        fetch('/api/plaid', {
            method: 'POST',
        })
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <Button variant="outlined" onClick={onClick}>
            Connect bank with plaid
        </Button>
    );
}
