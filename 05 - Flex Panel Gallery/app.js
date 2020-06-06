var panelElems = document.querySelectorAll(`.panels > .panel`);

const clickHandler = function(e) {

    const clickedPanelElem = e.currentTarget;

    let elemOtherPanels = Array.from(panelElems)
        .filter(elem => elem !== clickedPanelElem);

    elemOtherPanels.forEach(elem => {
        elem.classList.remove(`open`);
    })

    clickedPanelElem.classList.toggle(`open`);
};

const transitionendHandler = function(e) {
    this.classList.toggle(`open-active`);
}

panelElems.forEach(panelElem => {
    panelElem.addEventListener(`click`, clickHandler);
});

panelElems.forEach(panelElem => {
    panelElem.addEventListener(`transitionend`, transitionendHandler);
});