$(() => {
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

NProgress.start();
window.onload = () => {
    localStorage.clear();
    NProgress.done();
}