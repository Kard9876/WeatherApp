/* Function that returns the value of a given cookie */
/* Credits to: https://www.w3schools.com/js/js_cookies.asp */
function getCookieValue(cookieName) {
    cookieName += "="
    let decodedCookies = decodeURIComponent(document.cookie)

    let cookies = decodedCookies.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return "";
}

/* Function that sets the value of a given cookie */
/* Credits to: https://www.w3schools.com/js/js_cookies.asp */
function setCookieValue(name, value, opts) {
    deleteCookie(name)

    let cookie = name + "=" + value + "; path=/"

    if (opts['expiration']) {
        let total = 0
        let expOpts = opts['expiration']

        if (expOpts['seconds']) total += expOpts['seconds'] * 1000

        if (expOpts['minutes']) total += expOpts['minutes'] * 1000 * 60

        if (expOpts['hours']) total += expOpts['hours'] * 1000 * 60 * 60

        if (expOpts['days']) total += expOpts['days'] * 1000 * 60 * 60 * 24

        let d = new Date()

        d.setTime(d.getTime() + total)

        cookie = cookie + "; expires= " + d.toUTCString() + ";";
    }

    document.cookie = cookie
}

/* Function that deletes a cookie, given it's name */
function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

/* Function that removes all children elements from a given element */
function removeAllChildren(elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild)
    }
}

export { getCookieValue, setCookieValue, deleteCookie, removeAllChildren }