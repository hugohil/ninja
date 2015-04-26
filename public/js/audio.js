var audioElem = new Audio();
audioElem.src = '/dl/super-mario.mp3';
audioElem.controls = false;
audioElem.autoplay = false;
audioElem.style.display = 'none';
document.body.appendChild(audioElem);

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
if(!audioCtx){
  console.error('No audio context');
}
var analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;
var bufferLength = analyser.fftSize;
var waveArray = new Uint8Array(bufferLength);
var freqArray = new Uint8Array(bufferLength);

var source = audioCtx.createMediaElementSource(audioElem);
source.connect(analyser);
analyser.connect(audioCtx.destination);

var cvs = document.querySelector('#cvs');
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
var ctx = cvs.getContext('2d');

var sliceWidth = cvs.width / analyser.fftSize;
console.log(sliceWidth);
function draw(){
  requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(waveArray);
  analyser.getByteFrequencyData(freqArray);
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  ctx.fillStyle = '#333';
  for (var i = 0; i < bufferLength; i++) {
    ctx.globalAlpha = 1;
    var wave = (waveArray[i] / 128.0) * (cvs.height * .5);
    ctx.beginPath();
    ctx.arc(i + sliceWidth, wave, sliceWidth * .5, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = .3;
    var freq = (freqArray[i] / 128.0) * (cvs.height * .5);
    ctx.fillRect(i + sliceWidth, 0, sliceWidth, freq);
  }
}

window.addEventListener('load', function (event){
  draw();
}, false);

window.addEventListener("keyup", function (event) {
  if(event.keyCode == 32){
    if(audioElem.paused){
      audioElem.play();
    } else {
      audioElem.pause();
    }
  }
}, false);