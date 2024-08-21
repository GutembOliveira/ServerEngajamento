import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import HeaderNav from "../components/HeaderNav";

export default function Layout() {
    const [mode, setMode] = useState('light');
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />

            <HeaderNav mode={mode} toggleColorMode={toggleColorMode} />

            <main>
                <Outlet />
            </main>
        </ThemeProvider>
    )
}