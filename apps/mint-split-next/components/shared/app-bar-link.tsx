import { Box, Button } from '@mui/material';
import { ReactElement } from 'react';

function AppBarLink({
    pages,
    handleCloseNavMenu,
}: {
    pages: string[];
    handleCloseNavMenu: () => any;
}): ReactElement {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
            }}
        >
            {pages.map((page) => (
                <Button
                    variant="outlined"
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'secondary.light', display: 'block' }}
                    href={`/${page}`}
                >
                    {page}
                </Button>
            ))}
        </Box>
    );
}

export default AppBarLink;
