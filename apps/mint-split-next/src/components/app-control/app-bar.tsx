import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AppBarLink from '../shared/app-bar-link';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
const pages: string[] = ['dashboard', 'import', 'friends'];
const settings = ['profile', 'account', 'dashboard', 'user-preferences'];
// TODO this code is shit and needs to be fixed
function ResponsiveAppBar() {
    const { data: session, status } = useSession();
    const id = session?.id;

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    let links;
    let avatar;
    let alternateLinks;
    if (status === 'loading') {
    }
    if (!session) {
        links = (
            <Button
                variant="contained"
                href="/api/auth/signin"
                LinkComponent={Link}
            >
                Sign in
            </Button>
        );
    }
    if (id) {
        links = (
            <AppBarLink
                pages={pages}
                handleCloseNavMenu={handleCloseNavMenu}
                id={id}
            />
        );
        avatar = (
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                            alt="Remy Sharp"
                            src={session.user?.image ?? ''}
                        />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Button href={`/${setting}`} LinkComponent={Link}>
                                {setting}
                            </Button>
                        </MenuItem>
                    ))}
                    <MenuItem key="logout" onClick={() => signOut()}>
                        <Button>Logout</Button>
                    </MenuItem>
                </Menu>
            </Box>
        );
        alternateLinks = pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu} href={`/${page}`}>
                <Typography textAlign="center">
                    {/* <Button href={`/${page}`}>{page}</Button> */}
                </Typography>
            </MenuItem>
        ));
    }

    return (
        <AppBar position="static" style={{ margin: 0 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LocalAtmIcon />
                    <Button
                        component="a"
                        href="/"
                        LinkComponent={Link}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MintSplit
                    </Button>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {alternateLinks}
                        </Menu>
                    </Box>
                    <Link href="/" passHref>
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            MintSplit
                        </Typography>
                    </Link>

                    {links}
                    {avatar}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
