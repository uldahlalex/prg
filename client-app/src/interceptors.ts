import toast from "react-hot-toast";


const addJwtToFetch =() =>{
    const originalFetch = window.fetch;
    window.fetch = async function(url, options = {}) {
        options.headers = {
            ...options.headers,
            'Authorization': localStorage.getItem('token') ?? "",
        };
        return originalFetch(url, options);
    };
};
addJwtToFetch();
window.addEventListener('error', function (event) {
    toast("Caught in global error handler: " + event.message, {icon: '🔥'})
});

window.addEventListener('unhandledrejection', function (event) {
    toast("Caught in global error handler: ", {icon: '🔥'})
});