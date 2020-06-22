const voicesDropdown = document.querySelector('[name="voice"]');
const soundControls = document.querySelectorAll('[type="range"]');
const textArea = document.querySelector('[name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');


function populateVoices() {

    voices = this.getVoices();
    const filteredVoices = voices.filter(voice =>
        ['en', 'ru', 'ro'].some(rootLang => voice.lang.includes(rootLang)));

    console.log(filteredVoices);

    voicesDropdown.innerHTML = filteredVoices.map(voice => `
        <option value="${voice.voiceURI}">${voice.lang}: ${voice.voiceURI}</option>
    `).join('');
}

function setVoice() {

    console.log(`setVoice() called`);
    
    const selectedVoice = voices.find(v => v.voiceURI === this.value);
    utterance.voice = selectedVoice;

    console.log(utterance);

    toggle();
}

function toggle(e = null, startOver = true) {

    speechSynthesis.cancel();

    if (startOver) {
        speechSynthesis.speak(utterance);
        console.log(utterance)
    }
}

function setOption() {

    console.log(`SELECTED OPTION: ${this.name}: ${this.value}`);

    utterance[this.name] = this.value;
    
    console.log(utterance);

    toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);

voicesDropdown.addEventListener('change', setVoice);
soundControls.forEach(option => option.addEventListener('change', setOption));

speakButton.addEventListener('click', e => toggle(e));
stopButton.addEventListener('click', e => toggle(e, false));

const utterance = new SpeechSynthesisUtterance();
utterance.text = textArea.value;
let voices = [];
