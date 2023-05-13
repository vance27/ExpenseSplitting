import {
    Container,
    Tooltip,
    Card,
    CardContent,
    Avatar,
    Typography,
} from '@mui/material';

export default function FriendCard({ user, children }: any) {
    return (
        <Card
            sx={{
                display: 'inline-flex',
                justifyContent: 'center',
                flexDirection: 'column',
                m: 1,
            }}
        >
            <CardContent
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    display: 'flex',
                    flex: '1 0 auto',
                    maxWidth: 100,
                    minWidth: 100,
                }}
            >
                <Tooltip title={user.name} placement="top">
                    <Avatar alt={user.name} src={user.image} />
                </Tooltip>

                <Typography
                    noWrap
                    variant="body1"
                    display="block"
                    sx={{
                        textAlign: 'center',
                        minWidth: 100,
                        maxWidth: 100,
                    }}
                >
                    {user.name}
                </Typography>
                {children}
            </CardContent>
        </Card>
    );
}
