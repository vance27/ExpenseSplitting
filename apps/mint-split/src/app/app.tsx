import ResponsiveAppBar from './app-bar';
import { MintTheme } from './theme-provider';
import { UploadCsv } from './upload-csv';

export function App() {
    return (
        <MintTheme>
            <ResponsiveAppBar />
            <UploadCsv />
        </MintTheme>
    );
}

export default App;
