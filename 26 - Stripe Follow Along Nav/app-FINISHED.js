const triggers = document.querySelectorAll('.cool > li');
const dropdownUnderlay  = document.querySelector('.dropdownBackground');
const nav  = document.querySelector('.top');

function handleEnter() {

  this.classList.add('trigger-enter');
  
  // setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
  setTimeout(() => this.matches('.trigger-enter') && this.classList.add('trigger-enter-active'), 150);
  dropdownUnderlay.classList.add('open');

  const dropdown = this.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  };

  console.log(coords)
  console.log(navCoords)
  console.log('-------------')

  dropdownUnderlay.style.setProperty('width', `${coords.width}px`);
  dropdownUnderlay.style.setProperty('height', `${coords.height}px`);
  dropdownUnderlay.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  dropdownUnderlay.classList.remove('open');
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));