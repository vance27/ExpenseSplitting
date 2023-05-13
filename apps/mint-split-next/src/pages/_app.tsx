import { AppProps } from 'next/app';
import Head from 'next/head';
import ResponsiveAppBar from '../components/app-control/app-bar';
import './styles.css';
import { MintTheme } from '../components/app-control/theme-provider';
import Box from '@mui/material/Box';
import { SessionProvider } from 'next-auth/react';
import AuthContainer from '../components/app-control/auth-container';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';

const MintSplitApp: AppType = ({ Component, pageProps }: AppProps) => {
    return (
        <SessionProvider session={pageProps.session}>
            <Head>
                <title>MintSplit</title>
            </Head>
            <main className="app">
                <MintTheme>
                    <ResponsiveAppBar />
                    <Box m={2}>
                        <AuthContainer>
                            <Component {...pageProps} />
                        </AuthContainer>
                    </Box>
                </MintTheme>
            </main>
        </SessionProvider>
    );
};

export default trpc.withTRPC(MintSplitApp);