// DOM 요소
const cube = document.getElementById('cube');
const rotateXSlider = document.getElementById('rotateXSlider');
const rotateYSlider = document.getElementById('rotateYSlider');
const rotateZSlider = document.getElementById('rotateZSlider');
const fontSizeSlider = document.getElementById('fontSizeSlider');
const textColorInput = document.getElementById('textColor');
const bgColorInput = document.getElementById('bgColor');
const autoRotateBtn = document.getElementById('autoRotate');
const resetBtn = document.getElementById('reset');
const resetTextBtn = document.getElementById('resetText');
const testPhysicsBtn = document.getElementById('testPhysics');
const saveCubeBtn = document.getElementById('saveCube');
const savedCubesDiv = document.getElementById('savedCubes');

let isAutoRotating = false;
let currentFace = null;
let savedCubes = JSON.parse(localStorage.getItem('savedCubes')) || [];

// 큐브 회전 업데이트
function updateCube() {
    const rotateX = rotateXSlider.value;
    const rotateY = rotateYSlider.value;
    const rotateZ = rotateZSlider.value;
    
    document.getElementById('rotateX').textContent = rotateX;
    document.getElementById('rotateY').textContent = rotateY;
    document.getElementById('rotateZ').textContent = rotateZ;
    
    if (!isAutoRotating) {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    }
}

// 텍스트 스타일 업데이트
function updateTextStyle() {
    const fontSize = fontSizeSlider.value;
    document.getElementById('fontSize').textContent = fontSize + 'px';
    
    document.querySelectorAll('.face-content').forEach(content => {
        content.style.fontSize = fontSize + 'px';
    });
}

// 면 선택 처리
document.querySelectorAll('.face').forEach(face => {
    face.addEventListener('click', function(e) {
        if (e.target.classList.contains('face-content')) {
            currentFace = this;
            // 현재 면의 스타일 가져오기
            const content = this.querySelector('.face-content');
            const computedStyle = window.getComputedStyle(content);
            textColorInput.value = rgbToHex(computedStyle.color);
            bgColorInput.value = rgbToHex(window.getComputedStyle(this).backgroundColor);
        }
    });
});

// RGB를 HEX로 변환
function rgbToHex(rgb) {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (match) {
        return "#" + [1,2,3].map(i => {
            return ("0" + parseInt(match[i]).toString(16)).slice(-2);
        }).join('');
    }
    return rgb;
}

// 색상 변경 이벤트
textColorInput.addEventListener('input', function() {
    if (currentFace) {
        currentFace.querySelector('.face-content').style.color = this.value;
    } else {
        document.querySelectorAll('.face-content').forEach(content => {
            content.style.color = this.value;
        });
    }
});

bgColorInput.addEventListener('input', function() {
    if (currentFace) {
        currentFace.style.backgroundColor = this.value;
    } else {
        document.querySelectorAll('.face').forEach(face => {
            face.style.backgroundColor = this.value;
        });
    }
});

// 슬라이더 이벤트
rotateXSlider.addEventListener('input', updateCube);
rotateYSlider.addEventListener('input', updateCube);
rotateZSlider.addEventListener('input', updateCube);
fontSizeSlider.addEventListener('input', updateTextStyle);

// 자동 회전
autoRotateBtn.addEventListener('click', function() {
    isAutoRotating = !isAutoRotating;
    if (isAutoRotating) {
        cube.classList.add('auto-rotate');
        this.textContent = '자동 회전 정지';
    } else {
        cube.classList.remove('auto-rotate');
        this.textContent = '자동 회전';
        updateCube();
    }
});

// 리셋
resetBtn.addEventListener('click', function() {
    rotateXSlider.value = 0;
    rotateYSlider.value = 0;
    rotateZSlider.value = 0;
    isAutoRotating = false;
    cube.classList.remove('auto-rotate');
    autoRotateBtn.textContent = '자동 회전';
    updateCube();
});

// 텍스트 초기화
resetTextBtn.addEventListener('click', function() {
    document.querySelectorAll('.face').forEach((face, index) => {
        face.querySelector('.face-content').textContent = index + 1;
        face.querySelector('.face-content').style.color = '#000000';
        face.style.backgroundColor = '#ffffff';
    });
});

// 현재 큐브 상태 가져오기
function getCubeData() {
    const faces = [];
    document.querySelectorAll('.face').forEach(face => {
        const content = face.querySelector('.face-content');
        faces.push({
            text: content.textContent,
            fontSize: parseInt(content.style.fontSize) || 40,
            textColor: content.style.color || '#000000',
            backgroundColor: face.style.backgroundColor || '#ffffff'
        });
    });
    
    return {
        id: Date.now(),
        name: '커스텀 큐브',
        faces: faces,
        createdAt: new Date().toISOString()
    };
}

// 큐브 저장
saveCubeBtn.addEventListener('click', function() {
    const name = prompt('큐브 이름을 입력하세요:');
    if (name) {
        const cubeData = getCubeData();
        cubeData.name = name;
        savedCubes.push(cubeData);
        localStorage.setItem('savedCubes', JSON.stringify(savedCubes));
        displaySavedCubes();
        alert('저장되었습니다!');
    }
});

// 저장된 큐브 표시
function displaySavedCubes() {
    savedCubesDiv.innerHTML = '<h4>저장된 큐브:</h4>';
    savedCubes.forEach((cube, index) => {
        const item = document.createElement('div');
        item.className = 'saved-cube-item';
        item.innerHTML = `
            <span>${cube.name}</span>
            <div>
                <button onclick="loadCube(${index})">불러오기</button>
                <button onclick="deleteCube(${index})">삭제</button>
            </div>
        `;
        savedCubesDiv.appendChild(item);
    });
}

// 큐브 불러오기
window.loadCube = function(index) {
    const cube = savedCubes[index];
    document.querySelectorAll('.face').forEach((face, i) => {
        const content = face.querySelector('.face-content');
        const faceData = cube.faces[i];
        content.textContent = faceData.text;
        content.style.fontSize = faceData.fontSize + 'px';
        content.style.color = faceData.textColor;
        face.style.backgroundColor = faceData.backgroundColor;
    });
    fontSizeSlider.value = cube.faces[0].fontSize;
    updateTextStyle();
    alert('불러왔습니다!');
};

// 큐브 삭제
window.deleteCube = function(index) {
    if (confirm('정말 삭제하시겠습니까?')) {
        savedCubes.splice(index, 1);
        localStorage.setItem('savedCubes', JSON.stringify(savedCubes));
        displaySavedCubes();
    }
};

// 물리엔진으로 전달
testPhysicsBtn.addEventListener('click', function() {
    const cubeData = getCubeData();
    localStorage.setItem('currentCubeData', JSON.stringify(cubeData));
    window.location.href = '../11-physics-dice/index.html';
});

// 키보드 단축키
document.addEventListener('keydown', function(e) {
    if (e.target.contentEditable === 'true') return;
    
    switch(e.key) {
        case 'ArrowLeft':
            rotateYSlider.value = parseInt(rotateYSlider.value) - 10;
            updateCube();
            break;
        case 'ArrowRight':
            rotateYSlider.value = parseInt(rotateYSlider.value) + 10;
            updateCube();
            break;
        case 'ArrowUp':
            rotateXSlider.value = parseInt(rotateXSlider.value) - 10;
            updateCube();
            break;
        case 'ArrowDown':
            rotateXSlider.value = parseInt(rotateXSlider.value) + 10;
            updateCube();
            break;
    }
});

// 마우스 드래그로 회전
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

cube.addEventListener('mousedown', function(e) {
    if (e.target.contentEditable === 'true') return;
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;
    
    rotateYSlider.value = parseInt(rotateYSlider.value) + deltaX;
    rotateXSlider.value = parseInt(rotateXSlider.value) - deltaY;
    
    updateCube();
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('mouseup', function() {
    isDragging = false;
});

// 초기화
updateCube();
updateTextStyle();
displaySavedCubes();