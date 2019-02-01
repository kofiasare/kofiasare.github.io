$(() => {
    // Initialize Animsition
    $(".animsition").animsition({});

    // Retrieve verified user
    const user = JSON.parse(localStorage.getItem('verifiedUser'));
    if (!user || !user.emailVerified) return location.href = "/projects/pages/login/index.html";
    $('.header h1').text(`Hi ${user.firstName}`);


})