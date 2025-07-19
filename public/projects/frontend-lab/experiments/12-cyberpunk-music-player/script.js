// 사이버펑크 뮤직플레이어 2025 - JavaScript

// 플레이리스트 데이터
const playlist = [
    {
        id: 1,
        title: "Neon Dreams",
        artist: "Cyber Artist",
        duration: "3:45",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        title: "Digital Horizon",
        artist: "Synth Master",
        duration: "4:12",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        title: "Chrome Heart",
        artist: "Neo Tokyo",
        duration: "3:28",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        id: 4,
        title: "Cyber City Lights",
        artist: "Future Sound",
        duration: "5:02",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        id: 5,
        title: "Electric Dreams",
        artist: "Neon Wave",
        duration: "3:55",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        id: 6,
        title: "Virtual Reality",
        artist: "Digital Mind",
        duration: "4:33",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    {
        id: 7,
        title: "Hologram Love",
        artist: "Cyber Romance",
        duration: "3:18",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    {
        id: 8,
        title: "Quantum Beat",
        artist: "Future Bass",
        duration: "4:45",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    }
];

// DOM 요소들
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const volumeSlider = document.getElementById('volumeSlider');
const progressFill = document.getElementById('progressFill');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const trackTitleEl = document.getElementById('trackTitle');
const trackArtistEl = document.getElementById('trackArtist');
const playlistItemsEl = document.getElementById('playlistItems');
const visualizerCanvas = document.getElementById('visualizer');
const ctx = visualizerCanvas.getContext('2d');

// 상태 관리
let currentTrackIndex = 0;
let isPlaying = false;
let isShuffled = false;
let isRepeating = false;
let audioContext = null;
let analyser = null;
let source = null;
let animationId = null;

// 초기화
function init() {
    renderPlaylist();
    loadTrack(currentTrackIndex);
    setupEventListeners();
    setupAudioContext();
    resizeCanvas();
}

// 캔버스 리사이즈
function resizeCanvas() {
    visualizerCanvas.width = visualizerCanvas.offsetWidth;
    visualizerCanvas.height = visualizerCanvas.offsetHeight;
}

// 오디오 컨텍스트 설정
function setupAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
}

// 플레이리스트 렌더링
function renderPlaylist() {
    playlistItemsEl.innerHTML = playlist.map((track, index) => `
        <div class="playlist-item ${index === currentTrackIndex ? 'active' : ''}" data-index="${index}">
            <span class="playlist-item-number">${String(index + 1).padStart(2, '0')}</span>
            <div class="playlist-item-info">
                <div class="playlist-item-title">${track.title}</div>
                <div class="playlist-item-artist">${track.artist}</div>
            </div>
            <span class="playlist-item-duration">${track.duration}</span>
        </div>
    `).join('');

    // 플레이리스트 아이템 클릭 이벤트
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            loadTrack(index);
            playTrack();
        });
    });
}

// 트랙 로드
function loadTrack(index) {
    currentTrackIndex = index;
    const track = playlist[index];
    
    audioPlayer.src = track.url;
    trackTitleEl.textContent = track.title;
    trackArtistEl.textContent = track.artist;
    totalTimeEl.textContent = track.duration;
    
    // 플레이리스트 활성 아이템 업데이트
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

// 재생/일시정지
function playTrack() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    if (!source || !isPlaying) {
        source = audioContext.createMediaElementSource(audioPlayer);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
    }
    
    audioPlayer.play();
    isPlaying = true;
    updatePlayButton();
    startVisualizer();
    document.querySelector('.music-player').classList.add('playing');
}

function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayButton();
    cancelAnimationFrame(animationId);
    document.querySelector('.music-player').classList.remove('playing');
}

// 재생 버튼 업데이트
function updatePlayButton() {
    const playIcon = playBtn.querySelector('.play-icon');
    const pauseIcon = playBtn.querySelector('.pause-icon');
    
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// 이전/다음 트랙
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
}

function nextTrack() {
    if (isShuffled) {
        currentTrackIndex = Math.floor(Math.random() * playlist.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
}

// 시간 포맷팅
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 비주얼라이저
function startVisualizer() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    function draw() {
        animationId = requestAnimationFrame(draw);
        
        analyser.getByteFrequencyData(dataArray);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
        
        const barWidth = (visualizerCanvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
            barHeight = (dataArray[i] / 255) * visualizerCanvas.height * 0.8;
            
            // 그라디언트 색상
            const gradient = ctx.createLinearGradient(0, visualizerCanvas.height, 0, visualizerCanvas.height - barHeight);
            gradient.addColorStop(0, '#00ffff');
            gradient.addColorStop(0.5, '#ff00ff');
            gradient.addColorStop(1, '#00ff88');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);
            
            // 글로우 효과
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#00ffff';
            
            x += barWidth + 1;
        }
    }
    
    draw();
}
// 이벤트 리스너 설정
function setupEventListeners() {
    // 재생/일시정지
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });
    
    // 이전/다음
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    
    // 셔플
    shuffleBtn.addEventListener('click', () => {
        isShuffled = !isShuffled;
        shuffleBtn.classList.toggle('active', isShuffled);
    });
    
    // 반복
    repeatBtn.addEventListener('click', () => {
        isRepeating = !isRepeating;
        repeatBtn.classList.toggle('active', isRepeating);
        audioPlayer.loop = isRepeating;
    });
    
    // 볼륨
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        audioPlayer.volume = volume;
        document.querySelector('.volume-value').textContent = `${e.target.value}%`;
    });
    
    // 프로그레스 바 클릭
    document.querySelector('.progress-bar').addEventListener('click', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    });
    
    // 오디오 이벤트
    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressFill.style.width = `${percent}%`;
            currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        }
    });
    
    audioPlayer.addEventListener('ended', () => {
        if (!isRepeating) {
            nextTrack();
        }
    });
    
    // 이퀄라이저 슬라이더
    document.querySelectorAll('.eq-bar input').forEach(slider => {
        slider.addEventListener('input', (e) => {
            // 실제 이퀄라이저 효과 구현 (Web Audio API 필터 사용)
            // 여기서는 시각적 효과만 구현
            const value = e.target.value;
            e.target.style.background = `linear-gradient(to top, #ff00ff 0%, #ff00ff ${50 + value * 4}%, rgba(255,255,255,0.1) ${50 + value * 4}%)`;
        });
    });
    
    // 추가 기능 버튼들
    document.getElementById('visualizerBtn').addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('.visualizer-container').classList.toggle('fullscreen');
    });
    
    document.getElementById('lyricsBtn').addEventListener('click', function() {
        this.classList.toggle('active');
        // 가사 표시 기능 구현
        showNotification('가사 기능은 준비 중입니다');
    });
    
    document.getElementById('spectrumBtn').addEventListener('click', function() {
        this.classList.toggle('active');
        // 스펙트럼 분석기 토글
    });
    
    // 키보드 단축키
    document.addEventListener('keydown', (e) => {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                if (isPlaying) pauseTrack();
                else playTrack();
                break;
            case 'ArrowLeft':
                prevTrack();
                break;
            case 'ArrowRight':
                nextTrack();
                break;
            case 'ArrowUp':
                volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 5);
                volumeSlider.dispatchEvent(new Event('input'));
                break;
            case 'ArrowDown':
                volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 5);
                volumeSlider.dispatchEvent(new Event('input'));
                break;
        }
    });
    
    // 윈도우 리사이즈
    window.addEventListener('resize', resizeCanvas);
}

// 알림 표시
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 255, 0.9);
        color: #000;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: bold;
        z-index: 9999;
        animation: slideIn 0.3s ease, slideOut 0.3s ease 2s forwards;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// 글리치 효과
function addGlitchEffect() {
    const glitchInterval = setInterval(() => {
        const shouldGlitch = Math.random() > 0.95;
        if (shouldGlitch) {
            document.querySelector('.music-player').style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.querySelector('.music-player').style.filter = 'none';
            }, 100);
        }
    }, 2000);
}

// 파티클 효과 (배경)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes float {
        0% { transform: translateY(0) translateX(0); }
        33% { transform: translateY(-100vh) translateX(50px); }
        66% { transform: translateY(-200vh) translateX(-50px); }
        100% { transform: translateY(-300vh) translateX(0); }
    }
    
    .visualizer-container.fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        margin: 0;
    }
`;
document.head.appendChild(style);

// 초기화 실행
document.addEventListener('DOMContentLoaded', () => {
    init();
    addGlitchEffect();
    createParticles();
});

// 오류 처리
audioPlayer.addEventListener('error', (e) => {
    console.error('오디오 재생 오류:', e);
    showNotification('트랙을 재생할 수 없습니다');
    nextTrack();
});