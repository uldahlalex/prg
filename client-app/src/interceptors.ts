import toast from "react-hot-toast";


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
window.addEventListener('error', function (event) {
    toast("Caught in global error handler: " + event.message, {icon: '🔥'})
});

window.addEventListener('unhandledrejection', function (event) {
    toast("Caught in global error handler: ", {icon: '🔥'})
});