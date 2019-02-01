window.onload = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.authenticated) return location.href = "/projects/pages/login/views/dashboard.html";
}

$(() => {
    // Initialize Animsition
    $(".animsition").animsition({});

    // Datastore
    const userProfiles = [
        { firstName: 'Admin', lastName: 'User', email: 'admin@gmail.com' },
    ];

    // Helpers
    const veryfyEmail = (email, timeout) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = (userProfiles.filter(profile => profile.email === email)[0]);
                if (user) resolve({ firstName: user.firstName, lastName: user.lastName, email: user.email });
                else resolve(false);
            }, timeout)
        });
    }


    // Step 1 (User Email Verification)
    $('#login_form.step_1').on('submit', (e) => {
        e.preventDefault();
        NProgress.start();
        veryfyEmail($('form input[type=email]').val(), 7000)
            .then(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(Object.assign({ emailVerified: true }, user)));
                    location.href = '/projects/pages/login/views/password.html';
                    return;
                };

                // invalid credential 
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