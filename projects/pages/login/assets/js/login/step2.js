window.onload = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.authenticated) return location.href = "/projects/pages/login/views/dashboard.html";
}

$(() => {

    // Initialize Animsition
    $(".animsition").animsition({});

    // Retrieve Verified User
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.emailVerified) return location.href = "/projects/pages/login/index.html";
    $('.header h1').text(`Hi ${currentUser.firstName}`);

    // Datastore
    const userProfiles = [
        { email: 'admin@gmail.com', password: 'password' },
    ];


    // Helpers
    const authenticatePassword = (password, timeout) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const _user = (userProfiles.filter(profile => profile.email === currentUser.email)[0]);
                if (_user.password === password) resolve(currentUser);
                else resolve(false);
            }, timeout)
        });
    }

    // Step 2 ( User Password Authentication)
    $('#login_form.step_2').on('submit', (e) => {
        e.preventDefault();
        NProgress.start();
        authenticatePassword($('form input[type=password]').val(), 1000)
            .then(authenticatedUser => {
                if (authenticatedUser) {
                    localStorage.clear();
                    localStorage.setItem('currentUser', JSON.stringify(Object.assign({ authenticated: true }, authenticatedUser)));
                    location.href = '/projects/pages/login/views/dashboard.html';
                    return;
                };

                // oninvalid credential 
                $.toast({
                    heading: 'Error',
                    icon: 'error',
                    position: 'top-center',
                    hideAfter: false,
                    stack: 1,
                    showHideTransition: 'slide',
                    text: `Your login detail is incorrect. Please try again`,
                })
                NProgress.done();

            });
    });
})