var enhancePage = function() {

    var html = document.getElementsByTagName('html')[0],
    addClass = 'js',
    removalClass = 'no-js';

    if (html.classList) {
        html.classList.add(addClass);
        html.classList.remove(removalClass);
    }
};

export {enhancePage};