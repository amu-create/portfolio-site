// DOM Elements
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const currentTimeSpan = document.getElementById('currentTime');
const totalTimeSpan = document.getElementById('totalTime');
const volumeSlider = document.getElementById('volumeSlider');
const vinylRecord = document.querySelector('.vinyl-record');
const audioCanvas = document.getElementById('audioCanvas');
const waveformCanvas = document.getElementById('waveform');

// Audio Context for Visualizer
let audioContext;
let analyser;
let dataArray;
let animationId;

// Player State
let isPlaying = false;

// Initialize Audio Context
function initAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    
    const source = audioContext.createMediaElementSource(audioPlayer);
    source.connect(analyser);