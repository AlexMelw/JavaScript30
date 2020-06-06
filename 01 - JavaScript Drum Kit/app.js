const playSound = function (e) {
    console.log(e);
    if (e.repeat) {
        return;
    }
    var keyCode = e.keyCode || e.which;
    var keyDiv = document.querySelector(`div[data-key="${keyCode}"]`);
    var audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    if (!keyDiv || !audio) {
        return;
    }
    keyDiv.classList.add(`playing`);
    audio.currentTime = 0;
    audio.play();
};

window.addEventListener("keydown", playSound);

var keys = Array.from(document.querySelectorAll(`div.key`));
keys.forEach(key => {
    key.addEventListener(`transitionend`, function (e) {
        
        if (e.propertyName !== `transform`){
            return;
        }
        this.classList.remove(`playing`);
    })
});