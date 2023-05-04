import { AppProps } from 'next/app';
import Head from 'next/head';
import ResponsiveAppBar from '../components/app-bar';
import './styles.css';
import { MintTheme } from '../components/theme-provider';
import Box from '@mui/material/Box';

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>MintSplit</title>
            </Head>
            <main className="app">
                <MintTheme>
                    <ResponsiveAppBar />
                    <Box m={2}>
                        <Component {...pageProps} />
                    </Box>
                </MintTheme>
            </main>
        </>
    );
}

export default CustomApp;
