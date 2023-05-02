import { Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './app-bar';
import { MintTheme } from './theme-provider';
import { UploadCsv } from './upload-csv';
import { Dashboard } from './components/dashboard';
import { Preferences } from './components/preferences';
import { Login } from './components/login';
import useToken from './useToken';

export function App() {
    // const { token, setToken } = useToken();

    // if (!token) {
    //     return <Login setToken={setToken} />;
    // }

    return (
        <MintTheme>
            <ResponsiveAppBar />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/preferences" element={<Preferences />}></Route>
                <Route path="/uploadCsv" element={<UploadCsv />}></Route>
            </Routes>
        </MintTheme>
    );
}

export default App;
