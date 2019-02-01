window.onload = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.authenticated) return location.href = "/projects/pages/login/index.html";
    $.toast({
        heading: 'Welcome',
        icon: 'success',
        position: 'top-center',
        stack: 1,
        showHideTransition: 'slide',
        text: `Your login detail is incorrect. Please try again`,
    })
}

$(() => {
    // Initialize Animsition
    $(".animsition").animsition({});
    $('#logout').on('click', (e) => {
        localStorage.clear();
        location.href = "/projects/pages/login/index.html";
    });
});