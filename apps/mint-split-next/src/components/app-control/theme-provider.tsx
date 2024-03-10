import { ThemeProvider, createTheme } from '@mui/material';
import { ReactElement } from 'react';

export function MintTheme(props: any): ReactElement {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#38663e',
            },
            secondary: {
                main: '#ffffff',
            },
        },
    });

    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
