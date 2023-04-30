import { ThemeProvider, createTheme } from '@mui/material';
import { ReactElement } from 'react';

export function MintTheme(props: any): ReactElement {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#88dc60',
            },
            secondary: {
                main: '#b560dc',
            },
        },
    });

    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
