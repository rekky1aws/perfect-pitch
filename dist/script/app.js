// Pitch game
var play_button = document.querySelector('#play-button');
play_button === null || play_button === void 0 ? void 0 : play_button.addEventListener('click', playSound);
function playSound() {
    var context = new AudioContext();
    var o = context.createOscillator();
    var g = context.createGain();
    o.frequency.value = (Math.random() * 500) + 50;
    o.connect(g);
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 2);
    console.log(o);
}
console.log("chargé");
