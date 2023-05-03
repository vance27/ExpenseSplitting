import { AppProps } from 'next/app';
import Head from 'next/head';
import ResponsiveAppBar from '../components/app-bar';
import './styles.css';
import { MintTheme } from '../components/theme-provider';

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>MintSplit</title>
            </Head>
            <main className="app">
                <MintTheme>
                    <ResponsiveAppBar />
                    <Component {...pageProps} />
                </MintTheme>
            </main>
        </>
    );
}

export default CustomApp;
