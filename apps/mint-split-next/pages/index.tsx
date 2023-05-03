import ResponsiveAppBar from '../components/app-bar';
import { MintTheme } from '../components/theme-provider';
import { Dashboard } from '../components/dashboard';
import styles from './index.module.scss';

export function Index() {
    /*
     * Replace the elements below with your own.
     *
     * Note: The corresponding styles are in the ./index.scss file.
     */
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

export default Index;
``
