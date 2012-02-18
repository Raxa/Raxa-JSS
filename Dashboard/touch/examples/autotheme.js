(function() {
    var head = document.head || document.getElementsByTagName('head')[0],
        firstLink = document.getElementsByTagName('link')[0],
        userAgent = window.navigator.userAgent,
        cssPath = "../../resources/css/",
        isBB = userAgent.search(/blackberry/i) !== -1,
        link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';

    if (isBB) {
        link.href = cssPath + "bb6.css";
    }
    else {
        link.href = cssPath + "sencha-touch.css";
    }

    if (firstLink) {
        head.insertBefore(link, firstLink);
    } else {
        head.appendChild(link);
    }
})();
