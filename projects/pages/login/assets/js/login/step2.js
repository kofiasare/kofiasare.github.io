NProgress.start();
window.onload = () => NProgress.done();

$(() => {
    const user = JSON.parse(localStorage.getItem('verifiedUser'));
    if (!user || !user.emailVerified) {
        return location.href = "/projects/pages/login/index.html";
    }
    $('.header h1').text(`Hi ${user.firstName}`);
})