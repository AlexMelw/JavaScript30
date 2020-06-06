const controls = document.querySelectorAll(`div.controls input`);
const targetImage = document.querySelector(`img`);

const updateImage = function (e) {
    
    const propertyName = this.name;
    const propertyValue = this.value;
    const sizing = this.dataset.sizing || ``;

    document.documentElement.style.setProperty(`--${propertyName}`, propertyValue + sizing)
};
controls.forEach((control) => {
    control.addEventListener(`input`, updateImage);
    control.addEventListener(`change`, updateImage);
}); 