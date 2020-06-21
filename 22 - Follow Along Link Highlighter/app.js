const triggersNodes = document.querySelectorAll('a');
const highlighterNode = document.createElement('span')

highlighterNode.classList.add('highlight')
document.body.appendChild(highlighterNode);

function highlight(e) {

    const bounding = this.getBoundingClientRect();

    const coords = {
        width: bounding.width,
        height: bounding.height,
        top: bounding.top + window.scrollY,
        left: bounding.left + window.scrollX
    };

    const padding = {
        top: 5,
        right: 5,
        buttom: 5,
        left: 5,
    }
    
    highlighterNode.style.display = `block`;
    highlighterNode.style.width = `${padding.left + coords.width + padding.right}px`;
    highlighterNode.style.height = `${padding.top + coords.height + padding.left}px`;
    highlighterNode.style.transform = 
        `translate(${coords.left - padding.left}px, ${coords.top - padding.top}px)`;
}


triggersNodes.forEach(a => a.addEventListener('mouseover', highlight))
