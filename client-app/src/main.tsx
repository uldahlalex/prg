import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./components/App.tsx";

(function() {
    // Save a reference to the original fetch function
    const originalFetch = window.fetch;

    // Override the global fetch function
    window.fetch = async function(url, options = {}) {
        // Retrieve or manage your JWT token here
        const token = getJwtToken();

        // Ensure the headers object exists
        options.headers = {
            ...options.headers,
            'Authorization': `${token}`,
        };

        // Call the original fetch function with the modified options
        return originalFetch(url, options);
    };

    function getJwtToken() {
        // Implement the logic to retrieve your JWT token
        return localStorage.getItem('token');
    }
})();


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)
