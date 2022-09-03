// Pitch game
const playButton = document.querySelector('#play-button');
const changeButton = document.querySelector('#change-button');
const notesGrid = document.querySelector('#notes-grid');
const selectedNote = document.querySelector('#selected-note');

interface noteDictionnary {
    [index: string] : number;
}

const noteTable = {
    'C1': 32.7,
    'C#1': 34.65,
    'D1': 36.71,
    'D#1': 38.89,
    'E1': 41.2,
    'F1': 43.65,
    'F#1': 46.25,
    'G1': 49,
    'G#1': 51.91,
    'A1': 55,
    'A#1': 58.27,
    'B1': 61.74,
    'C2': 65.41,
    'C#2': 69.3,
    'D2': 73.42,
    'D#2': 77.78,
    'E2': 82.41,
    'F2': 87.31,
    'F#2': 92.5,
    'G2': 98,
    'G#2': 103.83,
    'A2': 110,
    'A#2': 116.54,
    'B2': 123.47,
    'C3': 130.81,
    'C#3': 138.59,
    'D3': 146.83,
    'D#3': 155.56,
    'E3': 164.81,
    'F3': 174.61,
    'F#3': 185,
    'G3': 196,
    'G#3': 207.65,
    'A3': 220,
    'A#3': 233.08,
    'B3': 246.94,
    'C4': 261.63,
    'C#4': 277.18,
    'D4': 293.66,
    'D#4': 311.13,
    'E4': 329.63,
    'F4': 349.23,
    'F#4': 369.99,
    'G4': 392,
    'G#4': 415.3,
    'A4': 440,
    'A#4': 466.16,
    'B4': 493.88,
    'C5': 523.25,
    'C#5': 554.37,
    'D5': 587.33,
    'D#5': 622.25,
    'E5': 659.26,
    'F5': 698.46,
    'F#5': 739.99,
    'G5': 783.99,
    'G#5': 830.61,
    'A5': 880,
    'A#5': 932.33,
    'B5': 987.77,
    'C6': 1046.5,
    'C#6': 1108.73,
    'D6': 1174.66,
    'D#6': 1244.51,
    'E6': 1318.51,
    'F6': 1396.91,
    'F#6': 1479.98,
    'G6': 1567.98,
    'G#6': 1661.22,
    'A6': 1760,
    'A#6': 1864.66,
    'B6': 1975.53
} as noteDictionnary;

playButton?.addEventListener('click', playSound);
changeButton?.addEventListener('click', changeSound);

var frequency: number = 0;
var noteName: string = 'not started';
var selectedNoteFrequency: number;

function playSound (): void
{
	var context = new AudioContext()
	var o = context.createOscillator()
	var  g = context.createGain();
	o.type = 'triangle';
	o.frequency.value = frequency;
	o.connect(g)
	g.connect(context.destination)
	o.start(0);

	g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 2)
}

function changeSound()
{
	let noteNames = Object.keys(noteTable);
	let noteName: string = noteNames[Math.floor(Math.random() * noteNames.length)];
	let frequency = noteTable[noteName];
	console.log(noteName, frequency);
	playSound();
	// console.log(noteNames);
}

function selectNote (event: Event)
{
    const target = event.target as HTMLInputElement;
    let noteDiv = (target.classList[0] === 'note') ? target : target.parentNode;

    selectedNoteFrequency = parseFloat(noteDiv?.childNodes[1].textContent);
    selectedNote.textContent = noteDiv.childNodes[0].textContent
    console.log(selectedNoteFrequency); 
    // selectedNote?.textContent = noteDiv.childNodes
}

function loadNotes ()
{	
	Object.keys(noteTable).forEach( (element) => {
		let noteDiv = document.createElement('div');
		noteDiv.className = 'note bg-blue-200 text-black flex flex-col justify-center rounded hover:scale-105 py-4 focus-within:bg-red-500';
        noteDiv.addEventListener('click', selectNote);

		let noteName = document.createElement('div');
		noteName.className = 'note-name text-center font-bold';
		noteName.textContent = element;

		let noteValue = document.createElement('div');
		noteValue.className = 'note-value text-center';
		noteValue.textContent = noteTable[element].toString();

		noteDiv.appendChild(noteName);
		noteDiv.appendChild(noteValue);
		notesGrid?.appendChild(noteDiv);
	});
}

loadNotes();

