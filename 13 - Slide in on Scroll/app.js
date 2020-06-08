function debounce(func, wait = 20, immediate = true) {

    var timeout = null;

    return function (...args) {

        var context = this;

        var later = function () {
            timeout = null;
            if (!immediate) func.call(context, ...args);
        };

        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) func.call(context, ...args);
    };
}

const slideInImagesElems = document.querySelectorAll('img.slide-in');
const appState = {
    oldScrollY: window.pageYOffset,
    isDirectionUp: function() {
        return this.oldScrollY > window.scrollY;
    }
};

function checkSlide(e) {

    slideInImagesElems.forEach(image => {

        const scrollInAt = window.scrollY + window.innerHeight - image.height / 2;
        const isAtLeastHalfShow = scrollInAt > image.offsetTop;
        const isScrolledPast = (image.offsetTop + image.height/2) < window.scrollY;
        const isImageWithinViewPort = (image.offsetTop + image.height) > window.scrollY &&
            image.offsetTop < window.scrollY + window.innerHeight;

        if (isAtLeastHalfShow && !isScrolledPast && !image.dataset.alreadyShown) {
            image.classList.add('active');
            image.dataset.alreadyShown = true;

        } else if(!image.dataset.alreadyShown) {
            image.classList.remove('active');
        }
    });

    appState.oldScrollY = window.scrollY;
}

window.addEventListener('load', checkSlide);
window.addEventListener('scroll', debounce(checkSlide));
