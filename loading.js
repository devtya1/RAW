document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem("Name") == "Saharsh"){
        window.location.href = 'training.html';
    }else{
    // Wait for 5 seconds
    setTimeout(() => {
        // Redirect to the dashboard page
        window.location.href = 'dashboard.html';
    }, 5000);
}
});
