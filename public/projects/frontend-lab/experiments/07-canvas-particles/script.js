// 캔버스 파티클 시스템
console.log('Script loaded');

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// 캔버스 크기 설정
function resizeCanvas() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 파티클 설정
let particleCount = 100;
let connectionDistance = 150;
let speedMultiplier = 1;
let currentTheme = 'blue';
let mouseEffect = 'attract';
let particles = [];
let mouse = { x: 0, y: 0 };
let activeConnections = 0;

console.log('Initial mouseEffect:', mouseEffect);

// 색상 테마
const themes = {
    blue: { primary: '#00d4ff', secondary: '#0099cc' },
    purple: { primary: '#ff00ff', secondary: '#9900cc' },
    green: { primary: '#00ff88', secondary: '#00cc66' },
    rainbow: { primary: 'rainbow', secondary: 'rainbow' }
};

// 파티클 클래스
class Particle {
    constructor() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 3 + 1;
    }

    update() {
        // 기본 움직임
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;

        // 화면 경계 처리
        if (this.x < 0 || this.x > canvas.offsetWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.offsetHeight) this.vy *= -1;

        // 마우스 상호작용
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {  // 범위를 100에서 150으로 증가
            const force = (150 - distance) / 150;
            if (mouseEffect === 'attract') {
                this.x += dx * force * 0.05;  // 0.02에서 0.05로 증가
                this.y += dy * force * 0.05;
            } else if (mouseEffect === 'repel') {
                this.x -= dx * force * 0.05;  // 0.02에서 0.05로 증가
                this.y -= dy * force * 0.05;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        if (currentTheme === 'rainbow') {
            const hue = (Date.now() / 20 + this.x / 5) % 360;
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        } else {
            ctx.fillStyle = themes[currentTheme].primary;
        }
        
        ctx.fill();
    }
}

// 파티클 생성
function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// 파티클 연결 그리기
function drawConnections() {
    activeConnections = 0;
    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                activeConnections++;
                const opacity = 1 - distance / connectionDistance;
                
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                
                if (currentTheme === 'rainbow') {
                    const hue = (Date.now() / 20 + distance) % 360;
                    ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${opacity * 0.5})`;
                } else {
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.5})`;
                }
                
                ctx.lineWidth = opacity * 2;
                ctx.stroke();
            }
        }
    }
}

// FPS 계산
let fps = 60;
let frameCount = 0;
let lastTime = performance.now();

function calculateFPS() {
    frameCount++;
    const currentTime = performance.now();
    if (currentTime >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        document.getElementById('fps').textContent = fps;
    }
}

// 애니메이션 루프
function animate() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // 마우스 효과 범위 표시
    if (mouse.x > 0 && mouse.y > 0 && mouseEffect !== 'none') {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2);
        ctx.strokeStyle = mouseEffect === 'attract' ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 0, 136, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 중심점 표시
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = mouseEffect === 'attract' ? '#00ff88' : '#ff0088';
        ctx.fill();
    }

    // 파티클 업데이트 및 그리기
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // 연결선 그리기
    drawConnections();

    // 통계 업데이트
    calculateFPS();
    document.getElementById('connections').textContent = activeConnections;

    requestAnimationFrame(animate);
}

// 마우스 이벤트
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

canvas.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

// DOM 로드 완료 후 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, setting up event listeners');
    
    // 컨트롤 이벤트
    document.getElementById('particleSlider').addEventListener('input', (e) => {
        particleCount = parseInt(e.target.value);
        document.getElementById('particleCount').textContent = particleCount;
        createParticles();
    });

    document.getElementById('distanceSlider').addEventListener('input', (e) => {
        connectionDistance = parseInt(e.target.value);
        document.getElementById('connectionDistance').textContent = connectionDistance;
    });

    document.getElementById('speedSlider').addEventListener('input', (e) => {
        speedMultiplier = parseFloat(e.target.value);
        document.getElementById('particleSpeed').textContent = speedMultiplier;
    });

    // 색상 테마 버튼
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTheme = btn.dataset.theme;
        });
    });

    // 효과 버튼
    document.querySelectorAll('.effect-btn').forEach(btn => {
        console.log('효과 버튼 발견:', btn.dataset.effect);
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('효과 버튼 클릭됨:', btn.dataset.effect);
            document.querySelectorAll('.effect-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            mouseEffect = btn.dataset.effect;
            console.log('현재 마우스 효과:', mouseEffect);
        });
    });
    
    // 초기화 및 시작
    createParticles();
    animate();
});