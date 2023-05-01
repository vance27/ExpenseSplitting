import { Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './app-bar';
import { MintTheme } from './theme-provider';
import { UploadCsv } from './upload-csv';
import { Dashboard } from './components/dashboard';
import { Preferences } from './components/preferences';
import { useState } from 'react';
import { Login } from './components/login';

function setToken(userToken: any): void {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken(): any {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

export function App() {
    const token = getToken();
    
    if (!token) {
        return <Login setToken={setToken} />;
    }

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
