/* Get Our Elements */
const playerElem = document.querySelector('.player');
const videoElem = playerElem.querySelector('.player__video');
const progressContainerElem = playerElem.querySelector('.progress');
const progressBarElem = playerElem.querySelector('.progress__filled');
const togglePlayButtonElem = playerElem.querySelector('.toggle');
const toggleFullscreenElem = playerElem.querySelector('[data-toggle-fullscreen]');
const skipButtonsElems = playerElem.querySelectorAll('[data-skip-sec]');
const rangesElems = playerElem.querySelectorAll('.player__slider');
const playerControlsElem = playerElem.querySelector('.player__controls');
const muteButtonElem = playerElem.querySelector('.player__button.sound');
const volumeRangeElem = playerElem.querySelector('[name="volume"]');

// Configuration
progressBarElem.style.flexBasis = `0%`;
const playerState = {
    previousVolumeLevel: 1,
    mouseDown: false,
    isPlayerFocused: false
};

// Define event handlers
const togglePlayback = function (e) {
    const method = videoElem.paused ? 'play' : 'pause';
    videoElem[method]();

    togglePlayButtonElem.textContent = videoElem.paused ? '►' : '❚❚';
}

const rewind = function (e) {
    videoElem.currentTime += parseFloat(this.dataset.skipSec);
}

const toggleFullscreen = function (e) {

    if (document.fullscreenElement) {
        document.exitFullscreen()
        return;
    }

    playerElem.requestFullscreen();
}

const updateMuteButton = function (e) {
   
    if (!videoElem.volume) {
        muteButtonElem.classList.add('mute');
    }
    else {
        muteButtonElem.classList.remove('mute');
    }
}


const toggleMute = function (e) {

    if (!videoElem.volume) {
        videoElem.volume = playerState.previousVolumeLevel;
        this.classList.remove('mute');
        return;
    }

    playerState.previousVolumeLevel = videoElem.volume;
    videoElem.volume = 0;
    this.classList.add('mute');
}

const updatePlayback = function (e) {
    console.log(`${this.name} :: ${this.value}`)

    videoElem[this.name] = parseFloat(this.value);
    console.log(videoElem.volume)

    updateMuteButton();

    if ('volume' === this.name) {
        playerState.previousVolumeLevel = parseFloat(this.value);
        const percentage = (playerState.previousVolumeLevel * 100).toFixed(0);
        this.dataset.tooltip = `${percentage}%`;
        console.log(playerState)
        return;
    }

    if ('playbackRate' === this.name) {
        this.dataset.tooltip = `${this.value}x`;
    }
}

const handleProgress = function (e) {
    var progressWidth = (this.currentTime / this.duration) * 100;
    progressBarElem.style.flexBasis = `${progressWidth}%`;
}

const scrub = function (e) {
    console.log(e);

    const progressBoundingRect = progressContainerElem.getBoundingClientRect();
    let offsetRelativeToProgressLeftMargin = e.clientX - progressBoundingRect.x;

    if (offsetRelativeToProgressLeftMargin < 0) {
        offsetRelativeToProgressLeftMargin = 0;

    } else if (offsetRelativeToProgressLeftMargin > progressBoundingRect.x + progressBoundingRect.width) {

        offsetRelativeToProgressLeftMargin = progressBoundingRect.x + progressBoundingRect.width
    }

    const scrubTime = ((offsetRelativeToProgressLeftMargin) / progressContainerElem.offsetWidth) * videoElem.duration;

    console.log(scrubTime)
    videoElem.currentTime = scrubTime;
}

const handleMouseWheel = function (e) {

    console.log(e)
    console.log(playerState)
    
    playerState.previousVolumeLevel += (-e.deltaY * 0.0005);

    if (playerState.previousVolumeLevel < 0) {
        playerState.previousVolumeLevel = 0;
    } else if (playerState.previousVolumeLevel > 1) {
        playerState.previousVolumeLevel = 1;
    }

    volumeRangeElem.value = playerState.previousVolumeLevel;
    videoElem.volume = playerState.previousVolumeLevel;

    updateMuteButton();

    const percentage = parseFloat(volumeRangeElem.value * 100).toFixed(0);
    volumeRangeElem.dataset.tooltip = `${percentage}%`;
    volumeRangeElem.focus({preventScroll:true});

    console.log(playerState)
}

// Attach event listeners
togglePlayButtonElem.addEventListener('click', togglePlayback);
toggleFullscreenElem.addEventListener('click', toggleFullscreen);

videoElem.addEventListener('dblclick', togglePlayback);

skipButtonsElems.forEach((elem) => {
    elem.addEventListener('click', rewind);
});

rangesElems.forEach((elem) => {
    elem.addEventListener('input', updatePlayback);
});

muteButtonElem.addEventListener('click', toggleMute);
videoElem.addEventListener('timeupdate', handleProgress);

progressContainerElem.addEventListener('click', scrub);
progressContainerElem.addEventListener('mousedown', () => playerState.mouseDown = true);
document.addEventListener('mouseup', () => playerState.mouseDown = false);
document.addEventListener('mousemove', (e) => playerState.mouseDown && scrub(e));

videoElem.addEventListener('ended', () => document.exitFullscreen())

document.addEventListener('wheel', (e) => playerState.isPlayerFocused && handleMouseWheel(e));
document.addEventListener('mousewheel', (e) => playerState.isPlayerFocused && handleMouseWheel(e));
document.addEventListener('DOMMouseScroll', (e) => playerState.isPlayerFocused && handleMouseWheel(e));

document.addEventListener('click', (e) => {
    playerState.isPlayerFocused = playerElem.contains(e.target);
});

