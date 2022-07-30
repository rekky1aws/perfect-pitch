// Pitch game
const play_button = document.querySelector('#play-button');

play_button?.addEventListener('click', playSound);

function playSound (): void {
	var context = new AudioContext()
	var o = context.createOscillator()
	var  g = context.createGain()
	o.frequency.value = (Math.random() * 500) + 50;
	o.connect(g)
	g.connect(context.destination)
	o.start(0);

	g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 2)
	console.log(o);
}

console.log("chargé");

