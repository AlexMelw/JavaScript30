const heroNode = document.querySelector('.hero');
const fireNode = heroNode.querySelector('h1');
const ppFireNode = fireNode.querySelector('span.positive-positive');
const npFireNode = fireNode.querySelector('span.negative-positive');
const pnFireNode = fireNode.querySelector('span.positive-negative');
const nnFireNode = fireNode.querySelector('span.negative-negative');

const walkSize = 400;

const onMouseMove = function (e) {

    console.log(e)

    const { clientWidth: containerWidth, clientHeight: containerHeight } = heroNode;

    let fireCenterX = fireNode.offsetLeft + fireNode.offsetWidth / 2;
    let fireCenterY = fireNode.offsetTop + fireNode.offsetHeight / 2;

    console.log('============');
    console.log(containerWidth);
    console.log(containerHeight);

    let { clientX: x, clientY: y } = e;

    console.log(x)
    console.log(y)

    if (e.target !== this) {
        x += e.target.offsetLeft;
        y += e.target.offsetTop;
    }

    const goX = fireCenterX - e.clientX;
    const goY = fireCenterY - e.clientY;
    const radius = Math.sqrt(Math.pow(goX, 2) + Math.pow(goY, 2))
    
    // const rad = x / containerWidth * 180 * (Math.PI / 180);
    const fireNodeRadius = Math.sqrt(Math.pow(fireNode.offsetWidth / 2, 2) + Math.pow(fireNode.offsetHeight / 2, 2));

    console.log(`radius: ${radius}`)
    console.log(`fireNodeRadius: ${fireNodeRadius}`)
    
    //PI / 2 === 90deg
    const rad = Math.min(radius / fireNodeRadius, 1) * 90 * Math.PI / 180;
    console.log(`radius / fireNodeRadius: ${rad}`)

    console.log(rad)
    console.log(Math.cos(rad))
    console.log(Math.abs(Math.cos(rad)))
    const factorScaleX = 1 + Math.abs(Math.sin(rad));
    console.log(factorScaleX)

    ppFireNode.style.display = 'block';
    ppFireNode.style.left = `${goX}px`;
    ppFireNode.style.top = `${goY}px`;
    ppFireNode.style.transform = `scale(${factorScaleX})`;

    npFireNode.style.display = 'block';
    npFireNode.style.left = `${-goX}px`;
    npFireNode.style.top = `${goY}px`;
    npFireNode.style.transform = `scale(${factorScaleX})`;

    pnFireNode.style.display = 'block';
    pnFireNode.style.left = `${goX}px`;
    pnFireNode.style.top = `${-goY}px`;
    pnFireNode.style.transform = `scale(${factorScaleX})`;

    nnFireNode.style.display = 'block';
    nnFireNode.style.left = `${-goX}px`;
    nnFireNode.style.top = `${-goY}px`;
    nnFireNode.style.transform = `scale(${factorScaleX})`;
}

heroNode.addEventListener('mousemove', onMouseMove)