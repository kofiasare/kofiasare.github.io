window.onload = () => localStorage.clear();

$(() => {
    // Initialize Animsition
    $(".animsition").animsition({});

    // Datastore
    const userProfiles = [
        { firstName: 'John', lastName: 'Doe', email: 'johndoe@gmail.com', password: 'tr#sted' },
        { firstName: 'Janet', lastName: 'Doe', email: 'janetdoe@gmail.com', password: 'tr#sted' },
        { firstName: 'Jida', lastName: 'Asare', email: 'jida@gmail.com', password: 'tr#sted' },
        { firstName: 'Kofi', lastName: 'Asare', email: 'kofi@gmail.com', password: 'tr#sted' },
    ];

    // Helpers
    const veryfyEmail = (email, timeout) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = (userProfiles.filter(profile => profile.email === email)[0]);
                if (user) resolve({ firstName: user.firstName, email: user.email });
                else resolve(false);
            }, timeout)
        });
    }


    // Step 1 (User Email Verification)
    $('#login_form').on('submit', (e) => {
        e.preventDefault();
        const email = $('form input[type=email]').val();
        NProgress.start();
        veryfyEmail(email, 1000)
            .then(user => {
                if (user) {
                    localStorage.setItem('verifiedUser', JSON.stringify({
                        firstName: user.firstName,
                        email: user.email,
                        emailVerified: true
                    }));
                    location.href = '/projects/pages/login/views/password.html';
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

    // Step 2 ( User Password Authentication)
})