// 전역 변수
let scene, camera, renderer;
let world;
let dice = [];
let throwBtn, diceCountSelect, diceTypeSelect;
let isRolling = false;
let orbitControls;
let customDiceData = null;

// 커스텀 주사위 면 텍스처 생성
function createDiceFaceTexture(faceData) {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    
    // 배경색
    context.fillStyle = faceData.backgroundColor || '#ffffff';
    context.fillRect(0, 0, size, size);
    
    // 텍스트 설정
    context.fillStyle = faceData.textColor || '#000000';
    context.font = `bold ${faceData.fontSize || 60}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // 여러 줄 텍스트 지원
    const text = faceData.text || '';
    const words = text.split(' ');
    const lines = [];
    let line = '';
    
    const maxWidth = size - 40;
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);
    
    // 여러 줄 텍스트 중앙 정렬
    const lineHeight = 70;
    const startY = size/2 - (lines.length - 1) * lineHeight/2;
    
    lines.forEach((line, index) => {
        context.fillText(line.trim(), size/2, startY + index * lineHeight);
    });
    
    return new THREE.CanvasTexture(canvas);
}

// 주사위 면 텍스처를 위한 캔버스 생성
function createDiceFaceCanvas(number) {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    
    // 배경
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, size, size);
    
    // 테두리
    context.strokeStyle = '#000000';
    context.lineWidth = 10;
    context.strokeRect(5, 5, size - 10, size - 10);
    
    // 점 그리기
    context.fillStyle = '#000000';
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
        context.beginPath();
        context.arc(x, y, dotSize/2, 0, 2 * Math.PI);
        context.fill();
    });
    
    return new THREE.CanvasTexture(canvas);
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
    camera.position.set(25, 30, 40);
    camera.lookAt(0, 0, 0);
    
    // 렌더러 설정
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0a0a0a, 1);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // OrbitControls 추가
    if (THREE.OrbitControls) {
        orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.dampingFactor = 0.05;
        orbitControls.minDistance = 20;
        orbitControls.maxDistance = 80;
        orbitControls.maxPolarAngle = Math.PI / 2 - 0.1; // 바닥 아래로 카메라가 가지 않도록
    } else {
        console.warn('OrbitControls를 사용할 수 없습니다. 마우스 컨트롤이 비활성화됩니다.');
    }
    
    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(20, 40, 20);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // 포인트 라이트 추가 (주사위 강조)
    const pointLight = new THREE.PointLight(0x00ff88, 0.5, 50);
    pointLight.position.set(0, 20, 0);
    scene.add(pointLight);
}

// Cannon.js 물리 엔진 초기화
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
    
    // Three.js 바닥 메시
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
    
    // 벽 생성 (주사위가 날아가지 않도록)
    const wallThickness = 1;
    const wallHeight = 30;
    const wallDistance = 50;
    
    // 벽 재질
    const wallMaterial = new CANNON.Material({
        friction: 0.1,
        restitution: 0.5
    });
    
    // 앞뒤 벽
    for (let i = 0; i < 2; i++) {
        const wallShape = new CANNON.Box(new CANNON.Vec3(wallDistance, wallHeight, wallThickness));
        const wallBody = new CANNON.Body({
            mass: 0,
            shape: wallShape,
            material: wallMaterial
        });
        wallBody.position.set(0, wallHeight, i === 0 ? -wallDistance : wallDistance);
        world.add(wallBody);
        
        // Three.js 벽 메시 (투명)
        const wallGeometry = new THREE.BoxGeometry(wallDistance * 2, wallHeight * 2, wallThickness * 2);
        const wallMesh = new THREE.Mesh(wallGeometry, new THREE.MeshStandardMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.1
        }));
        wallMesh.position.copy(wallBody.position);
        scene.add(wallMesh);
    }
    
    // 좌우 벽
    for (let i = 0; i < 2; i++) {
        const wallShape = new CANNON.Box(new CANNON.Vec3(wallThickness, wallHeight, wallDistance));
        const wallBody = new CANNON.Body({
            mass: 0,
            shape: wallShape,
            material: wallMaterial
        });
        wallBody.position.set(i === 0 ? -wallDistance : wallDistance, wallHeight, 0);
        world.add(wallBody);
        
        // Three.js 벽 메시 (투명)
        const wallGeometry = new THREE.BoxGeometry(wallThickness * 2, wallHeight * 2, wallDistance * 2);
        const wallMesh = new THREE.Mesh(wallGeometry, new THREE.MeshStandardMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.1
        }));
        wallMesh.position.copy(wallBody.position);
        scene.add(wallMesh);
    }
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
    
    // 랜덤 회전 적용
    body.quaternion.setFromEuler(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
    );
    
    // 랜덤 속도 적용
    body.velocity.set(
        (Math.random() - 0.5) * 30,
        Math.random() * 20 + 10,
        (Math.random() - 0.5) * 30
    );
    
    // 랜덤 각속도 적용
    body.angularVelocity.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    );
    
    world.add(body);
    
    // Three.js 메시
    const materials = [];
    
    // 주사위 타입에 따른 텍스처 생성
    const diceType = document.getElementById('dice-type').value;
    
    if (diceType === 'custom' && customDiceData) {
        // 커스텀 주사위 텍스처 생성
        customDiceData.faces.forEach(faceData => {
            materials.push(new THREE.MeshStandardMaterial({
                map: createDiceFaceTexture(faceData),
                roughness: 0.4,
                metalness: 0.1
            }));
        });
    } else {
        // 표준 주사위 텍스처 생성
        for (let i = 1; i <= 6; i++) {
            materials.push(new THREE.MeshStandardMaterial({
                map: createDiceFaceCanvas(i),
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
    
    for (let i = 1; i <= 6; i++) {
        materials.push(new THREE.MeshStandardMaterial({
            map: createDiceFaceCanvas(i),
            metalness: 0.3,
            roughness: 0.4
        }));
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
    throwBtn.disabled = true;
    throwBtn.textContent = '굴리는 중...';
    
    // 기존 주사위 제거
    dice.forEach(die => {
        world.remove(die.body);
        scene.remove(die.mesh);
    });
    dice = [];
    
    // 결과 숨기기
    document.getElementById('results').style.display = 'none';
    
    // 새 주사위 생성
    const count = parseInt(diceCountSelect.value);
    for (let i = 0; i < count; i++) {
        const position = new CANNON.Vec3(
            (Math.random() - 0.5) * 10,
            15 + i * 3,
            (Math.random() - 0.5) * 10
        );
        dice.push(createDice(position));
    }
    
    // 일정 시간 후 결과 확인
    setTimeout(checkResults, 4000);
}

// 주사위 상단면 확인
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
        { normal: new THREE.Vector3(1, 0, 0), value: 1 },  // +X
        { normal: new THREE.Vector3(-1, 0, 0), value: 6 }, // -X
        { normal: new THREE.Vector3(0, 1, 0), value: 2 },  // +Y
        { normal: new THREE.Vector3(0, -1, 0), value: 5 }, // -Y
        { normal: new THREE.Vector3(0, 0, 1), value: 3 },  // +Z
        { normal: new THREE.Vector3(0, 0, -1), value: 4 }  // -Z
    ];
    
    // 위쪽을 향하는 벡터
    const upVector = new THREE.Vector3(0, 1, 0);
    
    // 각 면의 현재 방향 계산
    let maxDot = -1;
    let topFaceIndex = 0;
    
    faces.forEach((face, index) => {
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
            topFaceIndex = index;
        }
    });
    
    // 커스텀 주사위인 경우 실제 면 내용 반환
    const diceType = document.getElementById('dice-type').value;
    if (diceType === 'custom' && customDiceData) {
        return customDiceData.faces[topFaceIndex];
    }
    
    return faces[topFaceIndex].value;
}

// 결과 확인
function checkResults() {
    const results = [];
    let allStopped = true;
    
    dice.forEach(die => {
        const velocity = die.body.velocity;
        const angularVelocity = die.body.angularVelocity;
        
        // 움직임 확인
        if (velocity.length() > 0.1 || angularVelocity.length() > 0.1) {
            allStopped = false;
        }
    });
    
    if (!allStopped) {
        // 아직 움직이고 있으면 다시 확인
        setTimeout(checkResults, 500);
        return;
    }
    
    // 모든 주사위가 멈췄으면 결과 계산
    dice.forEach((die, index) => {
        const value = getDiceValue(die);
        results.push(value);
    });
    
    displayResults(results);
    
    isRolling = false;
    throwBtn.disabled = false;
    throwBtn.textContent = '주사위 던지기';
}

// 결과 표시
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    const resultList = document.getElementById('result-list');
    const totalSum = document.getElementById('total-sum');
    
    resultList.innerHTML = '';
    
    results.forEach((value, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <div class="dice-icon">${value}</div>
            <span>주사위 ${index + 1}: ${value}</span>
        `;
        resultList.appendChild(resultItem);
    });
    
    // 커스텀 주사위인 경우 합계 표시 안함
    const diceType = document.getElementById('dice-type').value;
    if (diceType === 'standard') {
        const sum = results.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        totalSum.textContent = `합계: ${sum}`;
        totalSum.style.display = 'block';
    } else {
        totalSum.style.display = 'none';
    }
    
    resultsDiv.style.display = 'block';
}

// 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);
    
    // 물리 엔진 업데이트
    world.step(1/60);
    
    // 주사위 위치 동기화
    dice.forEach(die => {
        die.mesh.position.copy(die.body.position);
        die.mesh.quaternion.copy(die.body.quaternion);
    });
    
    // OrbitControls 업데이트
    if (orbitControls) {
        orbitControls.update();
    }
    
    // 렌더링
    renderer.render(scene, camera);
}

// 윈도우 리사이즈 처리
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 커스텀 주사위 로드
function loadCustomDice() {
    const selectedDice = localStorage.getItem('selectedCustomDice');
    if (selectedDice) {
        customDiceData = JSON.parse(selectedDice);
        
        // 알림 표시
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            left: 30px;
            background: linear-gradient(45deg, #00ff88, #00d4ff);
            color: #000;
            padding: 15px 20px;
            border-radius: 15px;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.5s ease;
        `;
        notification.textContent = `커스텀 주사위 "${customDiceData.name}" 로드됨`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
        
        // 주사위 타입을 커스텀으로 설정
        diceTypeSelect.value = 'custom';
    }
}

// 주사위 타입 변경 처리
function handleDiceTypeChange() {
    const diceType = diceTypeSelect.value;
    
    if (diceType === 'custom' && !customDiceData) {
        // 커스텀 주사위가 없는 경우
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            left: 30px;
            background: rgba(255, 100, 100, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 15px;
            font-weight: bold;
            z-index: 1000;
        `;
        notification.innerHTML = `
            커스텀 주사위가 없습니다.<br>
            <a href="../03-dice-maker/" style="color: white; text-decoration: underline;">주사위 만들기로 이동</a>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // 표준 주사위로 되돌리기
        diceTypeSelect.value = 'standard';
    }
}

// 초기화
function init() {
    console.log('초기화 시작');
    
    try {
        initThree();
        console.log('Three.js 초기화 완료');
    } catch (e) {
        console.error('Three.js 초기화 실패:', e);
        document.getElementById('loading').innerHTML = '<p style="color: red;">Three.js 초기화 실패</p>';
        return;
    }
    
    try {
        initCannon();
        console.log('Cannon.js 초기화 완료');
    } catch (e) {
        console.error('Cannon.js 초기화 실패:', e);
        document.getElementById('loading').innerHTML = '<p style="color: red;">물리엔진 초기화 실패</p>';
        return;
    }
    
    // DOM 요소 참조
    throwBtn = document.getElementById('throw-btn');
    diceCountSelect = document.getElementById('dice-count');
    diceTypeSelect = document.getElementById('dice-type');
    
    // 커스텀 주사위 로드
    loadCustomDice();
    
    // 이벤트 리스너
    throwBtn.addEventListener('click', throwDice);
    diceTypeSelect.addEventListener('change', handleDiceTypeChange);
    window.addEventListener('resize', handleResize);
    
    // 로딩 화면 숨기기
    document.getElementById('loading').style.display = 'none';
    
    // 애니메이션 시작
    animate();
    
    // 초기 주사위 던지기
    setTimeout(() => {
        throwDice();
    }, 500);
    
    console.log('초기화 완료');
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// 페이지 로드 완료 시 초기화
window.addEventListener('DOMContentLoaded', () => {
    // 라이브러리 로드 확인
    if (typeof THREE === 'undefined') {
        console.error('Three.js가 로드되지 않았습니다.');
        document.getElementById('loading').innerHTML = '<p style="color: red;">Three.js 로드 실패</p>';
        return;
    }
    
    if (typeof CANNON === 'undefined') {
        console.error('Cannon.js가 로드되지 않았습니다.');
        document.getElementById('loading').innerHTML = '<p style="color: red;">Cannon.js 로드 실패</p>';
        return;
    }
    
    // OrbitControls 확인
    if (!THREE.OrbitControls) {
        console.error('OrbitControls가 로드되지 않았습니다.');
        document.getElementById('loading').innerHTML = '<p style="color: red;">OrbitControls 로드 실패</p>';
        return;
    }
    
    // 모든 라이브러리가 로드되면 초기화
    setTimeout(init, 100);
});