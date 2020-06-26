const navNode = document.querySelector(`nav.top`);
const dropdownUnderlayNode = document.querySelector(`.dropdownBackground`);
const triggersNodeList = document.querySelectorAll(`.cool > li`);



function handleMouseEnter(e) {

    this.classList.add(`trigger-enter`);

    setTimeout(() => {
        this.classList.contains(`trigger-enter`) && this.classList.add(`trigger-enter-active`);
    }, 150);
    
    dropdownUnderlayNode.classList.add(`open`);

    const innerDropdownRect = this.querySelector(`.dropdown`).getBoundingClientRect();
    const navRect = navNode.getBoundingClientRect();

    const coords = {
        height: innerDropdownRect.height,
        width: innerDropdownRect.width,
        top: innerDropdownRect.top - navRect.top,
        left: innerDropdownRect.left - navRect.left
    };

    console.log(innerDropdownRect);
    console.log(navRect);
    console.log(coords);

    dropdownUnderlayNode.style.setProperty(`width`, `${coords.width}px`);
    dropdownUnderlayNode.style.setProperty(`height`, `${coords.height}px`);
    dropdownUnderlayNode.style.setProperty(`transform`, `translate(${coords.left}px, ${coords.top}px)`);
}


function handleMouseLeave(e) {
    this.classList.remove(`trigger-enter`, `trigger-enter-active`);
    dropdownUnderlayNode.classList.remove(`open`);
}


triggersNodeList.forEach(node => node.addEventListener(`mouseenter`, handleMouseEnter))
triggersNodeList.forEach(node => node.addEventListener(`mouseleave`, handleMouseLeave))
