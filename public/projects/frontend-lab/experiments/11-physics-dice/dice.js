// 전역 변수
let scene, camera, renderer;
let world;
let dice = [];
let diceValues = [];
let isRolling = false;
let controls;
let customCubeData = null;
let cameraSpeed = 1.0;

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
    camera.position.set(30, 40, 50);
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
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
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
    
    // 바닥 생성
    const groundShape = new CANNON.Box(new CANNON.Vec3(50, 0.5, 50));
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
    const groundGeometry = new THREE.BoxGeometry(100, 1, 100);
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
}

// 벽 생성
function createWalls() {
    const wallThickness = 1;
    const wallHeight = 30;
    const wallDistance = 50;
    
    const wallMaterial = new CANNON.Material({
        friction: 0.1,
        restitution: 0.5
    });
    
    // 4개의 벽
    const walls = [
        { pos: [0, wallHeight, -wallDistance], size: [wallDistance, wallHeight, wallThickness] },
        { pos: [0, wallHeight, wallDistance], size: [wallDistance, wallHeight, wallThickness] },
        { pos: [-wallDistance, wallHeight, 0], size: [wallThickness, wallHeight, wallDistance] },
        { pos: [wallDistance, wallHeight, 0], size: [wallThickness, wallHeight, wallDistance] }
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
    document.getElementById('throw-btn').addEventListener('click', throwDice);
    
    window.addEventListener('resize', onWindowResize);
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
    
    // 배경
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    // 테두리
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, size - 10, size - 10);
    
    // 점 그리기
    ctx.fillStyle = '#000000';
    const dotSize = 40;
    const positions = {
        1: [[size/2, size/2]],
        2: [[size/3, size/3], [2*size/3, 2*size/3]],
        3: [[size/3, size/3], [size/2, size/2], [2*size/3, 2*size/3]],
        4: [[size/3, size/3], [2*size/3, size/3], [size/3, 2*size/3], [2*size/3, 2*size/3]],
        5: [[size/3, size/3], [2*size/3, size/3], [size/2, size/2], [size/3, 2*size/3], [2*size/3, 2*size/3]],
        6: [[size/3, size/4], [size/3, size/2], [size/3, 3*size/4], [2*size/3, size/4], [2*size/3, size/2], [2*size/3, 3*size/4]]
    };
    
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
    
    // 랜덤 속도
    body.velocity.set(
        (Math.random() - 0.5) * 20,
        Math.random() * 10 + 20,
        (Math.random() - 0.5) * 20
    );
    
    // 랜덤 각속도
    body.angularVelocity.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    );
    
    world.add(body);
    
    // Three.js 메시
    const materials = [];
    const diceType = document.getElementById('dice-type').value;
    
    if (diceType === 'custom' && customCubeData) {
        // 커스텀 주사위
        customCubeData.faces.forEach(face => {
            materials.push(new THREE.MeshStandardMaterial({
                map: createDiceTexture(face.text, face.backgroundColor, face.textColor, face.fontSize),
                roughness: 0.4,
                metalness: 0.1
            }));
        });
    } else {
        // 숫자 주사위
        for (let i = 1; i <= 6; i++) {
            materials.push(new THREE.MeshStandardMaterial({
                map: createNumberDiceTexture(i),
                roughness: 0.4,
                metalness: 0.1
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
            (Math.random() - 0.5) * 10,
            15 + i * 3,
            (Math.random() - 0.5) * 10
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
        this.minDistance = 20;
        this.maxDistance = 100;
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
        
        this.init();
    }
    
    init() {
        this.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.domElement.addEventListener('wheel', this.onMouseWheel.bind(this));
        this.domElement.addEventListener('contextmenu', e => e.preventDefault());
        
        this.update();
    }
    
    onMouseDown(event) {
        if (!this.enabled) return;
        
        event.preventDefault();
        
        this.rotateStart.set(event.clientX, event.clientY);
        
        this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.domElement.addEventListener('mouseup', this.onMouseUp.bind(this));
    }
    
    onMouseMove(event) {
        if (!this.enabled) return;
        
        event.preventDefault();
        
        this.rotateEnd.set(event.clientX, event.clientY);
        this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(0.002 * cameraSpeed); // 전역 속도 변수 사용
        
        this.sphericalDelta.theta -= this.rotateDelta.x;
        this.sphericalDelta.phi -= this.rotateDelta.y;
        
        this.rotateStart.copy(this.rotateEnd);
        
        this.update();
    }
    
    onMouseUp() {
        this.domElement.removeEventListener('mousemove', this.onMouseMove.bind(this));
        this.domElement.removeEventListener('mouseup', this.onMouseUp.bind(this));
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