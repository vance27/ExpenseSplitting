import { Box, Button } from '@mui/material';
import { ReactElement } from 'react';

function AppBarLink({
    pages,
    handleCloseNavMenu,
    id,
}: {
    pages: string[];
    handleCloseNavMenu: () => any;
    id: string;
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
                    href={`/${page}/${id}`}
                >
                    {page}
                </Button>
            ))}
        </Box>
    );
}

export default AppBarLink;
