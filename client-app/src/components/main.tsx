import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx";
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material";


const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});
ReactDOM.createRoot(document.getElementById('root')!).render(

    <ThemeProvider theme={theme}>
        <App/>
    </ThemeProvider>

)
