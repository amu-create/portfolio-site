const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

// Shader 소스 코드
const vertexShaderSource = `
    attribute vec4 a_position;
    void main() {
        gl_Position = a_position;
    }
`;

const plasmaShaderSource = `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform float u_colorSpeed;
    uniform float u_waveIntensity;
    
    void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        
        float wave1 = sin(uv.x * 10.0 + u_time * u_colorSpeed) * u_waveIntensity;
        float wave2 = sin(uv.y * 10.0 + u_time * u_colorSpeed * 0.8) * u_waveIntensity;
        float wave3 = sin((uv.x + uv.y) * 10.0 + u_time * u_colorSpeed * 1.2) * u_waveIntensity;
        
        float r = sin(wave1 + wave2 + wave3) * 0.5 + 0.5;
        float g = sin(wave1 + wave2 + wave3 + 2.0) * 0.5 + 0.5;
        float b = sin(wave1 + wave2 + wave3 + 4.0) * 0.5 + 0.5;
        
        gl_FragColor = vec4(r, g, b, 1.0);
    }
`;

const fractalShaderSource = `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform float u_rotationSpeed;
    
    vec2 rotate(vec2 p, float a) {
        float s = sin(a);
        float c = cos(a);
        return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
    }
    
    void main() {
        vec2 uv = (gl_FragCoord.xy - u_resolution.xy * 0.5) / min(u_resolution.x, u_resolution.y);
        uv = rotate(uv, u_time * u_rotationSpeed * 0.5);
        
        vec3 col = vec3(0.0);
        float t = u_time * 0.5;
        
        for(float i = 0.0; i < 3.0; i++) {
            uv = abs(uv) / dot(uv, uv) - vec2(0.9, 0.5);
            col += vec3(uv.x, uv.y, sin(t + i * 0.5)) * 0.3;
        }
        
        gl_FragColor = vec4(col, 1.0);
    }
`;

const waveShaderSource = `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform float u_waveIntensity;
    
    void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        
        float wave = sin(uv.y * 20.0 + u_time * 2.0) * u_waveIntensity * 0.05;
        uv.x += wave;
        
        vec3 color = vec3(0.0);
        color.r = sin(uv.x * 10.0 + u_time) * 0.5 + 0.5;
        color.g = sin(uv.x * 10.0 + u_time + 2.0) * 0.5 + 0.5;
        color.b = sin(uv.x * 10.0 + u_time + 4.0) * 0.5 + 0.5;
        
        gl_FragColor = vec4(color, 1.0);
    }
`;

// Shader 컴파일 함수
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    
    return shader;
}

// 프로그램 생성 함수
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    
    return program;
}

// 초기화
let currentShader = 'plasma';
let program;
let isPaused = false;
let startTime = Date.now();

const colorSpeedSlider = document.getElementById('colorSpeedSlider');
const waveIntensitySlider = document.getElementById('waveIntensitySlider');
const rotationSpeedSlider = document.getElementById('rotationSpeedSlider');
const colorSpeedDisplay = document.getElementById('colorSpeed');
const waveIntensityDisplay = document.getElementById('waveIntensity');
const rotationSpeedDisplay = document.getElementById('rotationSpeed');

// Shader 설정
function setupShader(shaderSource) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shaderSource);
    program = createProgram(gl, vertexShader, fragmentShader);
    
    // 정점 버퍼 설정
    const positions = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1,
    ]);
    
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
}

// 캔버스 크기 조정
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
}

// 렌더링
function render() {
    if (!isPaused) {
        const currentTime = (Date.now() - startTime) * 0.001;
        
        gl.useProgram(program);
        
        // Uniform 설정
        const timeLocation = gl.getUniformLocation(program, 'u_time');
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
        const colorSpeedLocation = gl.getUniformLocation(program, 'u_colorSpeed');
        const waveIntensityLocation = gl.getUniformLocation(program, 'u_waveIntensity');
        const rotationSpeedLocation = gl.getUniformLocation(program, 'u_rotationSpeed');
        
        gl.uniform1f(timeLocation, currentTime);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.uniform1f(colorSpeedLocation, parseFloat(colorSpeedSlider.value));
        gl.uniform1f(waveIntensityLocation, parseFloat(waveIntensitySlider.value));
        gl.uniform1f(rotationSpeedLocation, parseFloat(rotationSpeedSlider.value));
        
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    
    requestAnimationFrame(render);
}

// 이벤트 리스너
colorSpeedSlider.addEventListener('input', () => {
    colorSpeedDisplay.textContent = colorSpeedSlider.value;
});

waveIntensitySlider.addEventListener('input', () => {
    waveIntensityDisplay.textContent = waveIntensitySlider.value;
});

rotationSpeedSlider.addEventListener('input', () => {
    rotationSpeedDisplay.textContent = rotationSpeedSlider.value;
});

document.getElementById('shader1').addEventListener('click', (e) => {
    currentShader = 'plasma';
    setupShader(plasmaShaderSource);
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
});

document.getElementById('shader2').addEventListener('click', (e) => {
    currentShader = 'fractal';
    setupShader(fractalShaderSource);
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
});

document.getElementById('shader3').addEventListener('click', (e) => {
    currentShader = 'wave';
    setupShader(waveShaderSource);
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
});

document.getElementById('pauseBtn').addEventListener('click', (e) => {
    isPaused = !isPaused;
    e.target.textContent = isPaused ? '재생' : '일시정지';
});

window.addEventListener('resize', resizeCanvas);

// 초기화 실행
resizeCanvas();
setupShader(plasmaShaderSource);
document.getElementById('shader1').classList.add('active');
render();