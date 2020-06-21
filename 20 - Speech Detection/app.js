window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let pNode = document.createElement('p')
const wordsNode = document.querySelector('.words');
wordsNode.appendChild(pNode)

recognition.addEventListener('result', e => {

    const speechTokens = [];
    Array.from(e.results)
        .forEach(result => [...result].forEach(resAlternative => {
            speechTokens.push(resAlternative.transcript);
        }));

    const transcript = speechTokens.join('')
        .replace(/chocolate/gi, '🍫')
        .replace(/smile/gi, '🙂');

    console.log(speechTokens)
    console.log(transcript)

    pNode.textContent = transcript;

    if (e.results[0].isFinal) {
        pNode = document.createElement('p')
        wordsNode.appendChild(pNode)
    }
});

recognition.addEventListener('end', recognition.start);
recognition.start();

