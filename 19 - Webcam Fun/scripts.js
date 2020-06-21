const videoNode = document.querySelector('.player');
const canvasNode = document.querySelector('.photo');
const ctxNode = canvasNode.getContext('2d');
const stripNode = document.querySelector('.strip');
const snapNode = document.querySelector('.snap');
const takePhotoButton = document.querySelector('#take-photo');
const ghostEffectButton = document.querySelector('#ghost-effect');
const levelInputsNodes = document.querySelectorAll('.rgb input');


function getVideo() {

    window.navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }).then(localMediaStream => {

        console.log(localMediaStream);

        videoNode.srcObject = localMediaStream;
        videoNode.play();

    }).catch(error => {
        console.error("Somthing went wrong.");
    })
}


function paintToCanvas() {
    const width = videoNode.videoWidth;
    const height = videoNode.videoHeight;

    canvasNode.width = width;
    canvasNode.height = height;

    return setInterval(() => {

        ctxNode.drawImage(videoNode, 0, 0, width, height);

        let pixels = ctxNode.getImageData(0, 0, width, height);

        pixels = greenScreen(pixels);

        ctxNode.putImageData(pixels, 0, 0);

    }, 16);
}


function takePhoto() {

    snapNode.currentTime = 0;
    snapNode.play();

    const data = canvasNode.toDataURL('image/jpeg');
    const linkNode = document.createElement('a');
    linkNode.href = data;
    linkNode.setAttribute('download', 'File name.jpg');
    linkNode.innerHTML = `
        <img src="${data}" alt="Picture of me">
    `;
    stripNode.insertBefore(linkNode, stripNode.firstChild);
}


function redEffect(pixels) {

    for (let i = 0; i < pixels.data.length - 3; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }

    return pixels;
}

function greenScreen(pixels) {

    const levels = {};

    levelInputsNodes.forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
}


takePhotoButton.addEventListener('click', takePhoto);
videoNode.addEventListener('canplay', paintToCanvas);

ghostEffectButton.addEventListener('click', () => {
    if (ctxNode.globalAlpha === 1) {
        ctxNode.globalAlpha = 0.1;
        return;
    }
    ctxNode.globalAlpha = 1;
})


getVideo();