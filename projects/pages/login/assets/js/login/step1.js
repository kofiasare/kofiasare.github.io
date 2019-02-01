NProgress.start();
window.onload = () => {
    localStorage.clear();
    NProgress.done();
}

// Datastore
const userProfiles = [
    { firstName: 'John', lastName: 'Doe', email: 'johndoe@gmail.com', password: 'tr#sted' },
    { firstName: 'Janet', lastName: 'Doe', email: 'janetdoe@gmail.com', password: 'tr#sted' },
    { firstName: 'Jida', lastName: 'Asare', email: 'jida@gmail.com', password: 'tr#sted' },
    { firstName: 'kofi', lastName: 'Asare', email: 'kofi@gmail.com', password: 'tr#sted' },
];

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
            if (!user) {
                $.toast({
                    heading: 'Error',
                    icon: 'error',
                    position: 'top-center',
                    hideAfter: false,
                    stack: 1,
                    showHideTransition: 'slide',
                    text: `An unexpected error occured while trying to show you the toast! 
                    ..Just kidding, it is just a message, toast is right in front of you.
                    `,
                })
                return NProgress.done();
            };

            const userInfo = {
                firstName: user.firstName,
                email: user.email,
                emailVerified: true
            };

            localStorage.setItem('verifiedUser', JSON.stringify(userInfo));
            location.href = '/projects/pages/login/views/password.html';
        });
});

// Step 2 ( User Password Authentication)