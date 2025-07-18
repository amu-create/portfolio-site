// 전역 변수
let scene, camera, renderer;
let world;
let dice = [];
let diceValues = [];
let isRolling = false;
let controls;
let customCubeData = null;
let cameraSpeed = 1.0;
let particles = [];
let diceTheme = 'classic';  // 주사위 테마

// 드래그 던지기 관련 변수
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let dragEnd = { x: 0, y: 0 };
let throwArrow = null;
let throwPowerText = null;

// 초기화
window.addEventListener('DOMContentLoaded', init);

function init() {
    // localStorage에서 커스텀 큐브 데이터 가져오기
    const savedData = localStorage.getItem('currentCubeData');
    if (savedData) {
        customCubeData = JSON.parse(savedData);
    }
    
    initThree();
    initCannon();
    initControls();
    animate();
    
    // 카메라 속도 조절 이벤트
    const speedSlider = document.getElementById('camera-speed');
    const speedValue = document.getElementById('speed-value');
    if (speedSlider) {
        speedSlider.addEventListener('input', function() {
            cameraSpeed = parseFloat(this.value);
            speedValue.textContent = cameraSpeed.toFixed(1);
        });
    }
    
    // 로딩 화면 제거
    document.getElementById('loading').style.display = 'none';
}

// Three.js 초기화
function initThree() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 100);
    
    // 카메라 설정
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(15, 20, 25);  // 카메라 위치를 절반으로
    camera.lookAt(0, 0, 0);
    
    // 렌더러 설정
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0a0a0a, 1);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(20, 40, 20);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -25;  // 작아진 맵에 맞게 조정
    directionalLight.shadow.camera.right = 25;
    directionalLight.shadow.camera.top = 25;
    directionalLight.shadow.camera.bottom = -25;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
}

// Cannon.js 물리엔진 초기화
function initCannon() {
    world = new CANNON.World();
    world.gravity.set(0, -30, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    
    // 바닥 생성 (크기를 1/4로 줄임)
    const groundShape = new CANNON.Box(new CANNON.Vec3(12.5, 0.5, 12.5));
    const groundBody = new CANNON.Body({
        mass: 0,
        shape: groundShape,
        material: new CANNON.Material({
            friction: 0.4,
            restitution: 0.3
        })
    });
    groundBody.position.set(0, -0.5, 0);
    world.add(groundBody);
    
    // Three.js 바닥
    const groundGeometry = new THREE.BoxGeometry(25, 1, 25);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.8,
        metalness: 0.2
    });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.position.y = -0.5;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);
    
    // 벽 생성 (투명)
    createWalls();
    
    // 천장 생성 (뚜껑)
    const ceilingShape = new CANNON.Box(new CANNON.Vec3(12.5, 0.5, 12.5));
    const ceilingBody = new CANNON.Body({
        mass: 0,
        shape: ceilingShape,
        material: new CANNON.Material({
            friction: 0.1,
            restitution: 0.3
        })
    });
    ceilingBody.position.set(0, 25, 0);  // 높이 25에 천장 설치
    world.add(ceilingBody);
    
    // Three.js 천장 (투명)
    const ceilingGeometry = new THREE.BoxGeometry(25, 1, 25);
    const ceilingMaterial = new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.05,  // 거의 투명하게
        side: THREE.DoubleSide
    });
    const ceilingMesh = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceilingMesh.position.y = 25;
    ceilingMesh.receiveShadow = true;
    scene.add(ceilingMesh);
    
    // 던지기 화살표 생성
    createThrowArrow();
}

// 벽 생성
function createWalls() {
    const wallThickness = 1;
    const wallHeight = 25;  // 천장까지 높이
    const wallDistance = 12.5;  // 거리를 1/4로
    
    const wallMaterial = new CANNON.Material({
        friction: 0.1,
        restitution: 0.5
    });
    
    // 4개의 벽
    const walls = [
        { pos: [0, wallHeight/2, -wallDistance], size: [wallDistance, wallHeight/2, wallThickness] },
        { pos: [0, wallHeight/2, wallDistance], size: [wallDistance, wallHeight/2, wallThickness] },
        { pos: [-wallDistance, wallHeight/2, 0], size: [wallThickness, wallHeight/2, wallDistance] },
        { pos: [wallDistance, wallHeight/2, 0], size: [wallThickness, wallHeight/2, wallDistance] }
    ];
    
    walls.forEach((wall, index) => {
        const wallShape = new CANNON.Box(new CANNON.Vec3(...wall.size));
        const wallBody = new CANNON.Body({
            mass: 0,
            shape: wallShape,
            material: wallMaterial
        });
        wallBody.position.set(...wall.pos);
        world.add(wallBody);
        
        // 투명한 벽 시각화
        const wallGeometry = new THREE.BoxGeometry(wall.size[0] * 2, wall.size[1] * 2, wall.size[2] * 2);
        const wallMesh = new THREE.Mesh(wallGeometry, new THREE.MeshStandardMaterial({
            color: index < 2 ? 0x00ff88 : 0x00d4ff,
            transparent: true,
            opacity: 0.1
        }));
        wallMesh.position.set(...wall.pos);
        scene.add(wallMesh);
    });
}

// 컨트롤 초기화
function initControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 20;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;
    
    // 이벤트 리스너
    document.getElementById('throw-btn').addEventListener('click', throwDiceButton);
    
    // 드래그 던지기 이벤트
    renderer.domElement.addEventListener('mousedown', onDragStart);
    renderer.domElement.addEventListener('mousemove', onDragMove);
    renderer.domElement.addEventListener('mouseup', onDragEnd);
    
    window.addEventListener('resize', onWindowResize);
}

// 파티클 생성
function createParticles(position, velocity) {
    console.log('Creating particles at:', position, 'velocity:', velocity); // 디버깅
    
    const particleCount = 30;  // 파티클 개수 증가
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];
    const colors = [];
    
    for (let i = 0; i < particleCount; i++) {
        // 위치
        positions.push(position.x + (Math.random() - 0.5) * 1);
        positions.push(position.y + (Math.random() - 0.5) * 1);
        positions.push(position.z + (Math.random() - 0.5) * 1);
        
        // 속도
        velocities.push((Math.random() - 0.5) * 15);
        velocities.push(Math.random() * 15 + 5);
        velocities.push((Math.random() - 0.5) * 15);
        
        // 색상 (네온 효과)
        colors.push(0, 1, 0.5); // RGB
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.5,  // 크기 증가
        transparent: true,
        opacity: 1.0,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    particles.push({ 
        mesh: particleSystem, 
        startTime: Date.now(),
        velocities: velocities 
    });
}

// 파티클 업데이트
function updateParticles() {
    const currentTime = Date.now();
    
    particles = particles.filter(particle => {
        const age = (currentTime - particle.startTime) / 1000;
        
        if (age > 1.5) {  // 수명 증가
            scene.remove(particle.mesh);
            particle.mesh.geometry.dispose();
            particle.mesh.material.dispose();
            return false;
        }
        
        const positions = particle.mesh.geometry.attributes.position.array;
        const velocities = particle.velocities;
        
        // 위치 업데이트
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i] * 0.016;     // X
            positions[i + 1] += velocities[i + 1] * 0.016; // Y
            positions[i + 2] += velocities[i + 2] * 0.016; // Z
            
            // 중력
            velocities[i + 1] -= 15 * 0.016;
        }
        
        particle.mesh.geometry.attributes.position.needsUpdate = true;
        particle.mesh.material.opacity = Math.max(0, 1 - age * 0.7);
        
        return true;
    });
}

// 던지기 화살표 생성
function createThrowArrow() {
    // 화살표 그룹
    throwArrow = new THREE.Group();
    
    // 화살표 몸통 (실린더)
    const shaftGeometry = new THREE.CylinderGeometry(0.1, 0.1, 5, 8);
    const shaftMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff88,
        transparent: true,
        opacity: 0.8
    });
    const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
    shaft.position.y = 2.5;
    
    // 화살표 머리 (원뿔)
    const headGeometry = new THREE.ConeGeometry(0.3, 1, 8);
    const headMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff88,
        transparent: true,
        opacity: 0.8
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 5.5;
    
    throwArrow.add(shaft);
    throwArrow.add(head);
    throwArrow.visible = false;
    scene.add(throwArrow);
}

// 주사위 텍스처 생성
function createDiceTexture(text, bgColor, textColor, fontSize) {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // 배경
    ctx.fillStyle = bgColor || '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    // 테두리
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, size - 8, size - 8);
    
    // 텍스트
    ctx.fillStyle = textColor || '#000000';
    ctx.font = `bold ${fontSize || 60}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 텍스트가 길면 줄바꿈
    const words = text.toString().split(' ');
    const lines = [];
    let line = '';
    
    const maxWidth = size - 40;
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);
    
    // 여러 줄 텍스트 그리기
    const lineHeight = fontSize || 60;
    const startY = size / 2 - (lines.length - 1) * lineHeight / 2;
    
    lines.forEach((line, index) => {
        ctx.fillText(line.trim(), size / 2, startY + index * lineHeight);
    });
    
    return new THREE.CanvasTexture(canvas);
}

// 숫자 주사위 텍스처
function createNumberDiceTexture(number) {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    const theme = document.getElementById('dice-theme').value;
    let bgColor, dotColor, borderColor;
    
    // 테마별 색상 설정
    switch(theme) {
        case 'neon':
            bgColor = '#000000';
            dotColor = '#00ff88';
            borderColor = '#00ff88';
            break;
        case 'wood':
            bgColor = '#8b6914';
            dotColor = '#3d2f0a';
            borderColor = '#5d4e10';
            break;
        case 'metal':
            bgColor = '#c0c0c0';
            dotColor = '#333333';
            borderColor = '#808080';
            break;
        default: // classic
            bgColor = '#ffffff';
            dotColor = '#000000';
            borderColor = '#000000';
    }
    
    // 배경
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
    
    // 테마별 효과
    if (theme === 'wood') {
        // 나무 무늬
        ctx.strokeStyle = 'rgba(61, 47, 10, 0.2)';
        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 30);
            ctx.quadraticCurveTo(size/2, i * 30 + 10, size, i * 30);
            ctx.stroke();
        }
    } else if (theme === 'metal') {
        // 메탈 그라데이션
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#e0e0e0');
        gradient.addColorStop(0.5, '#c0c0c0');
        gradient.addColorStop(1, '#a0a0a0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
    }
    
    // 테두리
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = theme === 'neon' ? 3 : 10;
    ctx.strokeRect(5, 5, size - 10, size - 10);
    
    // 네온 효과
    if (theme === 'neon') {
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 10;
        ctx.strokeRect(5, 5, size - 10, size - 10);
        ctx.shadowBlur = 0;
    }
    
    // 점 그리기
    ctx.fillStyle = dotColor;
    const dotSize = 40;
    const positions = {
        1: [[size/2, size/2]],
        2: [[size/3, size/3], [2*size/3, 2*size/3]],
        3: [[size/3, size/3], [size/2, size/2], [2*size/3, 2*size/3]],
        4: [[size/3, size/3], [2*size/3, size/3], [size/3, 2*size/3], [2*size/3, 2*size/3]],
        5: [[size/3, size/3], [2*size/3, size/3], [size/2, size/2], [size/3, 2*size/3], [2*size/3, 2*size/3]],
        6: [[size/3, size/4], [size/3, size/2], [size/3, 3*size/4], [2*size/3, size/4], [2*size/3, size/2], [2*size/3, 3*size/4]]
    };
    
    if (theme === 'neon') {
        ctx.shadowColor = dotColor;
        ctx.shadowBlur = 15;
    }
    
    positions[number].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, dotSize/2, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    return new THREE.CanvasTexture(canvas);
}

// 주사위 생성
function createDice(position) {
    const size = 2;
    
    // Cannon.js 바디
    const shape = new CANNON.Box(new CANNON.Vec3(size/2, size/2, size/2));
    const body = new CANNON.Body({
        mass: 1,
        shape: shape,
        material: new CANNON.Material({
            friction: 0.4,
            restitution: 0.2
        })
    });
    body.position.copy(position);
    
    // 랜덤 회전
    body.quaternion.setFromEuler(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
    );
    
    // 랜덤 속도 (더 세게 던지기)
    body.velocity.set(
        (Math.random() - 0.5) * 30,  // 수평 속도 증가
        Math.random() * 20 + 30,     // 수직 속도 크게 증가 (30~50)
        (Math.random() - 0.5) * 30
    );
    
    // 랜덤 각속도 (빠른 회전)
    body.angularVelocity.set(
        (Math.random() - 0.5) * 20,   // 각속도 증가
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    );
    
    world.add(body);
    
    // 충돌 이벤트 리스너 - CANNON.js 0.6.2 문법
    body.addEventListener('collide', function(e) {
        // 충돌 속도 계산
        const v1 = body.velocity;
        const v2 = e.body.velocity;
        const relativeVelocity = Math.sqrt(
            Math.pow(v1.x - v2.x, 2) + 
            Math.pow(v1.y - v2.y, 2) + 
            Math.pow(v1.z - v2.z, 2)
        );
        
        if (relativeVelocity > 5) {  // 충돌 강도 임계값 낮춤
            // 충돌 지점 계산
            const contactPoint = {
                x: (body.position.x + e.body.position.x) / 2,
                y: (body.position.y + e.body.position.y) / 2,
                z: (body.position.z + e.body.position.z) / 2
            };
            
            createParticles(contactPoint, relativeVelocity);
        }
    });
    
    // Three.js 메시
    const materials = [];
    const diceType = document.getElementById('dice-type').value;
    const theme = document.getElementById('dice-theme').value;
    
    // 테마별 재질 속성
    let materialProps = {
        roughness: 0.4,
        metalness: 0.1
    };
    
    switch(theme) {
        case 'neon':
            materialProps = { roughness: 0.2, metalness: 0.3, emissive: 0x00ff88, emissiveIntensity: 0.2 };
            break;
        case 'wood':
            materialProps = { roughness: 0.8, metalness: 0 };
            break;
        case 'metal':
            materialProps = { roughness: 0.3, metalness: 0.9 };
            break;
    }
    
    if (diceType === 'custom' && customCubeData) {
        // 커스텀 주사위
        customCubeData.faces.forEach(face => {
            materials.push(new THREE.MeshStandardMaterial({
                map: createDiceTexture(face.text, face.backgroundColor, face.textColor, face.fontSize),
                ...materialProps
            }));
        });
    } else {
        // 숫자 주사위
        for (let i = 1; i <= 6; i++) {
            materials.push(new THREE.MeshStandardMaterial({
                map: createNumberDiceTexture(i),
                ...materialProps
            }));
        }
    }
    
    const geometry = new THREE.BoxGeometry(size, size, size);
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    
    return { body, mesh };
}
// 드래그 시작
function onDragStart(event) {
    if (isRolling || event.button !== 2) return; // 오른쪽 버튼만
    
    event.preventDefault();
    isDragging = true;
    controls.enabled = false; // 카메라 컨트롤 비활성화
    
    dragStart.x = event.clientX;
    dragStart.y = event.clientY;
    dragEnd.x = event.clientX;
    dragEnd.y = event.clientY;
    
    throwArrow.visible = true;
    updateThrowArrow();
}

// 드래그 중
function onDragMove(event) {
    if (!isDragging) return;
    
    dragEnd.x = event.clientX;
    dragEnd.y = event.clientY;
    
    updateThrowArrow();
}

// 드래그 끝
function onDragEnd(event) {
    if (!isDragging) return;
    
    isDragging = false;
    controls.enabled = true; // 카메라 컨트롤 활성화
    throwArrow.visible = false;
    document.getElementById('power-gauge').style.display = 'none';
    
    // 드래그 거리 계산
    const dragDistance = Math.sqrt(
        Math.pow(dragEnd.x - dragStart.x, 2) + 
        Math.pow(dragEnd.y - dragStart.y, 2)
    );
    
    if (dragDistance > 20) { // 최소 드래그 거리
        throwDiceWithDirection();
    }
}

// 화살표 업데이트
function updateThrowArrow() {
    const deltaX = dragEnd.x - dragStart.x;
    const deltaY = dragEnd.y - dragStart.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < 10) {
        throwArrow.visible = false;
        document.getElementById('power-gauge').style.display = 'none';
        return;
    }
    
    // 파워 게이지 표시
    document.getElementById('power-gauge').style.display = 'block';
    
    // 화면 좌표를 3D 방향으로 변환
    const angle = Math.atan2(-deltaX, deltaY);
    const power = Math.min(distance / 200, 1); // 최대 파워 1
    
    // 파워 게이지 업데이트
    document.getElementById('power-fill').style.width = (power * 100) + '%';
    document.getElementById('power-percent').textContent = Math.round(power * 100) + '%';
    
    // 화살표 위치와 회전 설정
    throwArrow.position.set(0, 5, 0);
    throwArrow.rotation.z = angle;
    throwArrow.scale.set(power, power * 2, power);
    
    // 화살표 색상 변경 (파워에 따라)
    const color = new THREE.Color();
    color.setHSL(0.3 - power * 0.3, 1, 0.5); // 녹색에서 빨간색으로
    throwArrow.children.forEach(child => {
        child.material.color = color;
    });
}

// 방향과 세기로 주사위 던지기
function throwDiceWithDirection() {
    if (isRolling) return;
    
    isRolling = true;
    const throwBtn = document.getElementById('throw-btn');
    throwBtn.disabled = true;
    throwBtn.textContent = '굴리는 중...';
    
    // 기존 주사위 제거
    dice.forEach(die => {
        world.remove(die.body);
        scene.remove(die.mesh);
    });
    dice = [];
    diceValues = [];
    
    // 결과 숨기기
    document.getElementById('results').style.display = 'none';
    
    // 드래그 방향과 파워 계산
    const deltaX = dragEnd.x - dragStart.x;
    const deltaY = dragEnd.y - dragStart.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const power = Math.min(distance / 200, 1);
    
    // 새 주사위 생성
    const count = parseInt(document.getElementById('dice-count').value);
    for (let i = 0; i < count; i++) {
        const position = new CANNON.Vec3(
            (Math.random() - 0.5) * 8,
            15 + i * 3,
            (Math.random() - 0.5) * 8
        );
        const die = createDiceWithVelocity(position, deltaX, deltaY, power);
        dice.push(die);
    }
    
    // 결과 확인
    setTimeout(checkResults, 3000);
}

// 속도가 지정된 주사위 생성
function createDiceWithVelocity(position, deltaX, deltaY, power) {
    const size = 2;
    
    // Cannon.js 바디
    const shape = new CANNON.Box(new CANNON.Vec3(size/2, size/2, size/2));
    const body = new CANNON.Body({
        mass: 1,
        shape: shape,
        material: new CANNON.Material({
            friction: 0.4,
            restitution: 0.2
        })
    });
    body.position.copy(position);
    
    // 랜덤 회전
    body.quaternion.setFromEuler(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
    );
    
    // 드래그 방향에 따른 속도 설정
    const baseSpeed = 50 * power;
    body.velocity.set(
        -deltaX * 0.1 * power + (Math.random() - 0.5) * 10,
        Math.random() * 10 + 20,
        deltaY * 0.1 * power + (Math.random() - 0.5) * 10
    );
    
    // 랜덤 각속도
    body.angularVelocity.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    );
    
    world.add(body);
    
    // 충돌 이벤트 리스너
    body.addEventListener('collide', function(e) {
        const v1 = body.velocity;
        const v2 = e.body.velocity;
        const relativeVelocity = Math.sqrt(
            Math.pow(v1.x - v2.x, 2) + 
            Math.pow(v1.y - v2.y, 2) + 
            Math.pow(v1.z - v2.z, 2)
        );
        
        if (relativeVelocity > 5) {
            const contactPoint = {
                x: (body.position.x + e.body.position.x) / 2,
                y: (body.position.y + e.body.position.y) / 2,
                z: (body.position.z + e.body.position.z) / 2
            };
            
            createParticles(contactPoint, relativeVelocity);
        }
    });
    
    // Three.js 메시
    const materials = [];
    const diceType = document.getElementById('dice-type').value;
    const theme = document.getElementById('dice-theme').value;
    
    let materialProps = {
        roughness: 0.4,
        metalness: 0.1
    };
    
    switch(theme) {
        case 'neon':
            materialProps = { roughness: 0.2, metalness: 0.3, emissive: 0x00ff88, emissiveIntensity: 0.2 };
            break;
        case 'wood':
            materialProps = { roughness: 0.8, metalness: 0 };
            break;
        case 'metal':
            materialProps = { roughness: 0.3, metalness: 0.9 };
            break;
    }
    
    if (diceType === 'custom' && customCubeData) {
        customCubeData.faces.forEach(face => {
            materials.push(new THREE.MeshStandardMaterial({
                map: createDiceTexture(face.text, face.backgroundColor, face.textColor, face.fontSize),
                ...materialProps
            }));
        });
    } else {
        for (let i = 1; i <= 6; i++) {
            materials.push(new THREE.MeshStandardMaterial({
                map: createNumberDiceTexture(i),
                ...materialProps
            }));
        }
    }
    
    const geometry = new THREE.BoxGeometry(size, size, size);
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    
    return { body, mesh };
}

// 버튼으로 주사위 던지기 (기존 함수명 변경)
function throwDiceButton() {
    throwDice();
}

// 주사위 던지기
function throwDice() {
    if (isRolling) return;
    
    isRolling = true;
    const throwBtn = document.getElementById('throw-btn');
    throwBtn.disabled = true;
    throwBtn.textContent = '굴리는 중...';
    
    // 기존 주사위 제거
    dice.forEach(die => {
        world.remove(die.body);
        scene.remove(die.mesh);
    });
    dice = [];
    diceValues = [];
    
    // 결과 숨기기
    document.getElementById('results').style.display = 'none';
    
    // 새 주사위 생성
    const count = parseInt(document.getElementById('dice-count').value);
    for (let i = 0; i < count; i++) {
        const position = new CANNON.Vec3(
            (Math.random() - 0.5) * 8,  // 범위 약간 증가
            15 + i * 3,  // 높이 다시 증가
            (Math.random() - 0.5) * 8
        );
        dice.push(createDice(position));
    }
    
    // 결과 확인
    setTimeout(checkResults, 3000);
}

// 주사위 값 확인
function getDiceValue(die) {
    const quaternion = die.body.quaternion;
    const euler = new THREE.Euler();
    euler.setFromQuaternion(new THREE.Quaternion(
        quaternion.x,
        quaternion.y,
        quaternion.z,
        quaternion.w
    ));
    
    // 각 면의 법선 벡터
    const faces = [
        { normal: new THREE.Vector3(1, 0, 0), value: 1 },   // +X (오른쪽)
        { normal: new THREE.Vector3(-1, 0, 0), value: 2 },  // -X (왼쪽)
        { normal: new THREE.Vector3(0, 1, 0), value: 3 },   // +Y (위)
        { normal: new THREE.Vector3(0, -1, 0), value: 4 },  // -Y (아래)
        { normal: new THREE.Vector3(0, 0, 1), value: 5 },   // +Z (앞)
        { normal: new THREE.Vector3(0, 0, -1), value: 6 }   // -Z (뒤)
    ];
    
    // 위쪽을 향하는 벡터
    const upVector = new THREE.Vector3(0, 1, 0);
    
    // 각 면의 현재 방향 계산
    let maxDot = -1;
    let topFace = 1;
    
    faces.forEach(face => {
        const rotatedNormal = face.normal.clone();
        rotatedNormal.applyQuaternion(new THREE.Quaternion(
            quaternion.x,
            quaternion.y,
            quaternion.z,
            quaternion.w
        ));
        
        const dot = rotatedNormal.dot(upVector);
        if (dot > maxDot) {
            maxDot = dot;
            topFace = face.value;
        }
    });
    
    return topFace;
}

// 결과 확인
function checkResults() {
    let allStopped = true;
    
    dice.forEach(die => {
        const velocity = die.body.velocity;
        const angularVelocity = die.body.angularVelocity;
        
        if (velocity.length() > 0.1 || angularVelocity.length() > 0.1) {
            allStopped = false;
        }
    });
    
    if (!allStopped) {
        setTimeout(checkResults, 500);
        return;
    }
    
    // 결과 계산
    const diceType = document.getElementById('dice-type').value;
    const results = [];
    
    dice.forEach((die, index) => {
        const value = getDiceValue(die);
        if (diceType === 'custom' && customCubeData) {
            results.push({
                type: 'custom',
                value: customCubeData.faces[value - 1]
            });
        } else {
            results.push({
                type: 'number',
                value: value
            });
        }
    });
    
    displayResults(results);
    
    isRolling = false;
    const throwBtn = document.getElementById('throw-btn');
    throwBtn.disabled = false;
    throwBtn.textContent = '🎲 던지기!';
}

// 결과 표시
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    const resultList = document.getElementById('result-list');
    const totalSum = document.getElementById('total-sum');
    
    resultList.innerHTML = '';
    let sum = 0;
    
    results.forEach((result, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        if (result.type === 'custom') {
            resultItem.innerHTML = `
                <div class="dice-number" style="background: ${result.value.backgroundColor}; color: ${result.value.textColor}">
                    ${index + 1}
                </div>
                <div class="dice-text">${result.value.text}</div>
            `;
        } else {
            resultItem.innerHTML = `
                <div class="dice-number">${result.value}</div>
                <div class="dice-text">주사위 ${index + 1}</div>
            `;
            sum += result.value;
        }
        
        resultList.appendChild(resultItem);
    });
    
    // 숫자 주사위일 때만 합계 표시
    if (results.length > 0 && results[0].type === 'number') {
        totalSum.style.display = 'block';
        totalSum.textContent = `합계: ${sum}`;
    } else {
        totalSum.style.display = 'none';
    }
    
    resultsDiv.style.display = 'block';
}

// 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);
    
    // 물리엔진 업데이트
    world.step(1/60);
    
    // 주사위 위치 동기화
    dice.forEach(die => {
        die.mesh.position.copy(die.body.position);
        die.mesh.quaternion.copy(die.body.quaternion);
    });
    
    // 파티클 업데이트
    updateParticles();
    
    // 컨트롤 업데이트
    if (controls) {
        controls.update();
    }
    
    renderer.render(scene, camera);
}

// 윈도우 리사이즈
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// OrbitControls 간단 구현
class OrbitControls {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;
        this.enabled = true;
        
        this.target = new THREE.Vector3();
        this.minDistance = 10;  // 최소 거리도 줄임
        this.maxDistance = 50;  // 최대 거리도 줄임
        this.enableDamping = true;
        this.dampingFactor = 0.05;
        this.maxPolarAngle = Math.PI / 2 - 0.1;
        
        this.spherical = new THREE.Spherical();
        this.sphericalDelta = new THREE.Spherical();
        this.scale = 1;
        this.panOffset = new THREE.Vector3();
        
        this.rotateStart = new THREE.Vector2();
        this.rotateEnd = new THREE.Vector2();
        this.rotateDelta = new THREE.Vector2();
        
        this.isMouseDown = false;
        
        this.init();
    }
    
    init() {
        this.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.domElement.addEventListener('wheel', this.onMouseWheel.bind(this));
        this.domElement.addEventListener('contextmenu', e => e.preventDefault());
        
        // 마우스 이벤트 핸들러를 바인딩하여 저장
        this.boundMouseMove = this.onMouseMove.bind(this);
        this.boundMouseUp = this.onMouseUp.bind(this);
        
        this.update();
    }
    
    onMouseDown(event) {
        if (!this.enabled || this.isMouseDown) return;
        
        // 왼쪽 버튼만 처리 (0: 왼쪽, 1: 가운데, 2: 오른쪽)
        if (event.button !== 0) return;
        
        event.preventDefault();
        
        this.isMouseDown = true;
        this.rotateStart.set(event.clientX, event.clientY);
        
        document.addEventListener('mousemove', this.boundMouseMove);
        document.addEventListener('mouseup', this.boundMouseUp);
    }
    
    onMouseMove(event) {
        if (!this.enabled || !this.isMouseDown) return;
        
        event.preventDefault();
        
        this.rotateEnd.set(event.clientX, event.clientY);
        this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(0.002 * cameraSpeed); // 전역 속도 변수 사용
        
        this.sphericalDelta.theta -= this.rotateDelta.x;
        this.sphericalDelta.phi -= this.rotateDelta.y;
        
        this.rotateStart.copy(this.rotateEnd);
        
        this.update();
    }
    
    onMouseUp() {
        this.isMouseDown = false;
        document.removeEventListener('mousemove', this.boundMouseMove);
        document.removeEventListener('mouseup', this.boundMouseUp);
    }
    
    onMouseWheel(event) {
        if (!this.enabled) return;
        
        event.preventDefault();
        
        if (event.deltaY < 0) {
            this.scale *= 0.95;
        } else if (event.deltaY > 0) {
            this.scale /= 0.95;
        }
        
        this.update();
    }
    
    update() {
        const offset = new THREE.Vector3();
        const quat = new THREE.Quaternion().setFromUnitVectors(
            this.camera.up,
            new THREE.Vector3(0, 1, 0)
        );
        const quatInverse = quat.clone().invert();
        
        const lastPosition = new THREE.Vector3();
        const lastQuaternion = new THREE.Quaternion();
        
        const position = this.camera.position;
        
        offset.copy(position).sub(this.target);
        offset.applyQuaternion(quat);
        
        this.spherical.setFromVector3(offset);
        
        this.spherical.theta += this.sphericalDelta.theta;
        this.spherical.phi += this.sphericalDelta.phi;
        
        this.spherical.phi = Math.max(0, Math.min(this.maxPolarAngle, this.spherical.phi));
        
        this.spherical.makeSafe();
        
        this.spherical.radius *= this.scale;
        this.spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this.spherical.radius));
        
        this.target.add(this.panOffset);
        
        offset.setFromSpherical(this.spherical);
        offset.applyQuaternion(quatInverse);
        
        position.copy(this.target).add(offset);
        
        this.camera.lookAt(this.target);
        
        if (this.enableDamping) {
            this.sphericalDelta.theta *= (1 - this.dampingFactor);
            this.sphericalDelta.phi *= (1 - this.dampingFactor);
        } else {
            this.sphericalDelta.set(0, 0, 0);
        }
        
        this.scale = 1;
        this.panOffset.set(0, 0, 0);
    }
}