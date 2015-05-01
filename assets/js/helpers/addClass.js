function addClass(el, classString) {
    if (el.classList)
        return el.classList.add(classString);
    else
        return el.className += ' ' + classString;
}

export {addClass};