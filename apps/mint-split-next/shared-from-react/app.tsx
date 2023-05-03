import ResponsiveAppBar from '../components/app-bar';
import { MintTheme } from './theme-provider';
import { UploadCsv } from './upload-csv';
import { Dashboard } from './components/dashboard';
import { Preferences } from './components/preferences';
import { Login } from './components/login';
import useToken from './useToken';

export function App() {
    // const { token, setToken } = useToken(true);

    // if (!token) {
    //     return <Login setToken={setToken} />;
    // }

    return (
        <MintTheme>
            <ResponsiveAppBar />
            <Dashboard />
            {/* <Routes>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/preferences" element={<Preferences />}></Route>
                <Route path="/uploadCsv" element={<UploadCsv />}></Route>
            </Routes> */}
        </MintTheme>
    );
}

export default App;
