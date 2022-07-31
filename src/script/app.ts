// Pitch game
const play_button = document.querySelector('#play-button');
const change_button = document.querySelector('#change-button');

play_button?.addEventListener('click', playSound);
change_button?.addEventListener('click', changeSound);

var frequency: number = 0;
var noteName: string = "not started";

function playSound (): void
{
	var context = new AudioContext()
	var o = context.createOscillator()
	var  g = context.createGain();
	o.type = "triangle";
	o.frequency.value = frequency;
	o.connect(g)
	g.connect(context.destination)
	o.start(0);

	g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 2)
}

function changeSound()
{
	let noteNames = Object.keys(noteTable);
	noteName = noteNames[Math.floor(Math.random() * noteNames.length)];
	frequency = noteTable[noteName];
	console.log(noteName, frequency);
	playSound();
	// console.log(noteNames);
}

async function loadNotes ()
{
	const response = await fetch("https://gist.githubusercontent.com/marcgg/94e97def0e8694f906443ed5262e9cbb/raw/a303dd6d5eafd155d988a629e88018bb95e10bed/notevalues.json");

	if(response.ok) {
		const json = await response.blob();
		let text = await json.text();
		text = text.split("'").join("\"");
		let arr = text.split('\n');
		// Getting rid of octave 0 (too low) and misplaced ligne at start
		arr = arr.splice(18);
		// Getting rid of octaves 7 and 8 (too high)
		arr.splice(102);
		arr[arr.length - 1] = arr[arr.length - 1].replace(',', '');
		let result = JSON.parse("{\n" + arr.join('\n') + "}");
		return result;
	}
}

var noteTable: any;

const noteResponse = loadNotes().then((value) => noteTable = value);


