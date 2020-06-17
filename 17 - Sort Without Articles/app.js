const bands = [
    'The Plot in You',
    'The Devil Wears Prada',
    'Pierce the Veil',
    'Norma Jean',
    'The Bled',
    'Say Anything',
    'The Midway State',
    'We Came as Romans',
    'Counterparts',
    'Oh, Sleeper',
    'A Skylit Drive',
    'Anywhere But Here',
    'An Old Dog'
];

const bandsNode = document.querySelector("#bands");

 const sortedBand = bands.slice()
    .sort((left, right) => strip(left)?.localeCompare(strip(right)));

bandsNode.innerHTML = sortedBand.map(x => `<li>${x}</li>`).join("\n");

function strip(bandName) {
    return bandName.replace(/^(the|a|an)\s/i, "").trim();
}