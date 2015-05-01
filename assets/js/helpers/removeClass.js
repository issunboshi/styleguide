function removeClass(el, classString) {
    if (el.classList)
      	el.classList.remove(classString);
    else
      	el.className = el.className.replace(new RegExp('(^|\\b)' + classString.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

export {removeClass};

