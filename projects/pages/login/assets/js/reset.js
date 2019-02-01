window.onload = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.authenticated) return location.href = "/projects/pages/login/views/dashboard.html";
}

$(() => {
    // Initialize Animsition
    $(".animsition").animsition({});
})