import toast from "react-hot-toast";


window.addEventListener('error', function (event) {
    toast("Caught in global error handler: " + event.message, {icon: '🔥'})
});

window.addEventListener('unhandledrejection', function (event) {
    toast("Caught in global error handler: ", {icon: '🔥'})
});