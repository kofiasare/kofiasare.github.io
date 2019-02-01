window.onload = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.authenticated) return location.href = "/projects/pages/login/views/dashboard.html";
}

$(() => {
    // Initialize Animsition
    $(".animsition").animsition({});

    $('form input[type=tel]').intlTelInput({
        autoHideDialCode: false,
        separateDialCode: false,
        preferredCountries: ["gh"],
        nationalMode: false,
        initialCountry: "auto",
        geoIpLookup: (callback) => {
            $.get("https://ipinfo.io", () => {}, "jsonp")
                .always(resp => {
                    const country = (resp && resp.country) ? resp.country : "GH";
                    callback(country);
                });
        }
    });
})