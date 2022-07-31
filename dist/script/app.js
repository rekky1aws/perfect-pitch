var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Pitch game
var play_button = document.querySelector('#play-button');
var change_button = document.querySelector('#change-button');
play_button === null || play_button === void 0 ? void 0 : play_button.addEventListener('click', playSound);
change_button === null || change_button === void 0 ? void 0 : change_button.addEventListener('click', changeSound);
var frequency = 0;
var noteName = "not started";
function playSound() {
    var context = new AudioContext();
    var o = context.createOscillator();
    var g = context.createGain();
    o.type = "triangle";
    o.frequency.value = frequency;
    o.connect(g);
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 2);
}
function changeSound() {
    var noteNames = Object.keys(noteTable);
    noteName = noteNames[Math.floor(Math.random() * noteNames.length)];
    frequency = noteTable[noteName];
    console.log(noteName, frequency);
    playSound();
    // console.log(noteNames);
}
function loadNotes() {
    return __awaiter(this, void 0, void 0, function () {
        var response, json, text, arr, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://gist.githubusercontent.com/marcgg/94e97def0e8694f906443ed5262e9cbb/raw/a303dd6d5eafd155d988a629e88018bb95e10bed/notevalues.json")];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.blob()];
                case 2:
                    json = _a.sent();
                    return [4 /*yield*/, json.text()];
                case 3:
                    text = _a.sent();
                    text = text.split("'").join("\"");
                    arr = text.split('\n');
                    // Getting rid of octave 0 (too low) and misplaced ligne at start
                    arr = arr.splice(18);
                    // Getting rid of octaves 7 and 8 (too high)
                    arr.splice(102);
                    arr[arr.length - 1] = arr[arr.length - 1].replace(',', '');
                    result = JSON.parse("{\n" + arr.join('\n') + "}");
                    return [2 /*return*/, result];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var noteTable;
var noteResponse = loadNotes().then(function (value) { return noteTable = value; });
