(function(){
    const originalFetch = window.fetch;
    window.fetch = async function(url, options = {}) {
        options.headers = {
            ...options.headers,
            'Authorization': localStorage.getItem('token') ?? "",
        };
        return originalFetch(url, options);
    };
})();