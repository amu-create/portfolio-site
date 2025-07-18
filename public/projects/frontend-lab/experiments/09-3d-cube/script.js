const cube = document.querySelector('.cube');
const rotateXSlider = document.getElementById('rotateXSlider');
const rotateYSlider = document.getElementById('rotateYSlider');
const rotateZSlider = document.getElementById('rotateZSlider');
const scaleSlider = document.getElementById('scaleSlider');
const rotateXDisplay = document.getElementById('rotateX');
const rotateYDisplay = document.getElementById('rotateY');
const rotateZDisplay = document.getElementById('rotateZ');
const scaleDisplay = document.getElementById('scale');
const autoRotateBtn = document.getElementById('autoRotate');
const resetBtn = document.getElementById('reset');
const resetTextBtn = document.getElementById('resetText');
const emojiPopup = document.getElementById('emojiPopup');
const rollDiceBtn = document.getElementById('rollDice');
const saveCubeBtn = document.getElementById('saveCube');
const loadCubeBtn = document.getElementById('loadCube');
const savedCubesDiv = document.getElementById('savedCubes');
const diceResultModal = document.getElementById('diceResultModal');
const resultFace = document.getElementById('resultFace');
const closeModalBtn = document.getElementById('closeModal');

let isAutoRotating = false;
let currentFaceContent = null;
let savedCubes = JSON.parse(localStorage.getItem('savedCubes')) || [];

function updateCube() {
    const rotateX = rotateXSlider.value;
    const rotateY = rotateYSlider.value;
    const rotateZ = rotateZSlider.value;
    const scale = scaleSlider.value;
    
    rotateXDisplay.textContent = rotateX;
    rotateYDisplay.textContent = rotateY;
    rotateZDisplay.textContent = rotateZ;
    scaleDisplay.textContent = scale;
    
    if (!isAutoRotating && !cube.classList.contains('rolling')) {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
    }
    
    // CSS 변수 설정
    cube.style.setProperty('--rotateX', `${rotateX}deg`);
    cube.style.setProperty('--rotateZ', `${rotateZ}deg`);
    cube.style.setProperty('--scale', scale);
}

// 텍스트 편집 기능
document.querySelectorAll('.face-content').forEach(content => {
    // 포커스 시 전체 선택
    content.addEventListener('focus', function() {
        setTimeout(() => {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(this);
            selection.removeAllRanges();
            selection.addRange(range);
        }, 50);
    });
    
    // Enter 키로 포커스 해제
    content.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.blur();
        }
    });
});

// 툴바 기능
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const action = this.dataset.action;
        const faceContent = this.closest('.face').querySelector('.face-content');
        
        if (action === 'bold') {
            document.execCommand('bold', false, null);
            faceContent.focus();
        } else if (action === 'italic') {
            document.execCommand('italic', false, null);
            faceContent.focus();
        }
    });
});

// 색상 변경
document.querySelectorAll('.color-picker').forEach(picker => {
    picker.addEventListener('input', function() {
        const faceContent = this.closest('.face').querySelector('.face-content');
        faceContent.style.color = this.value;
        faceContent.focus();
    });
});

// 이모지 팝업
document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentFaceContent = this.closest('.face').querySelector('.face-content');
        
        const rect = this.getBoundingClientRect();
        emojiPopup.style.left = rect.left + 'px';
        emojiPopup.style.top = (rect.bottom + 5) + 'px';
        emojiPopup.classList.add('active');
    });
});

// 이모지 선택
document.querySelectorAll('.emoji-item').forEach(emoji => {
    emoji.addEventListener('click', function() {
        if (currentFaceContent) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const node = document.createTextNode(this.textContent);
            range.insertNode(node);
            range.setStartAfter(node);
            range.setEndAfter(node);
            selection.removeAllRanges();
            selection.addRange(range);
            currentFaceContent.focus();
        }
        emojiPopup.classList.remove('active');
    });
});

// 팝업 닫기
document.addEventListener('click', function(e) {
    if (!e.target.closest('.emoji-popup') && !e.target.closest('.emoji-btn')) {
        emojiPopup.classList.remove('active');
    }
});

// 슬라이더 이벤트 리스너
rotateXSlider.addEventListener('input', updateCube);
rotateYSlider.addEventListener('input', updateCube);
rotateZSlider.addEventListener('input', updateCube);
scaleSlider.addEventListener('input', updateCube);

// 자동 회전
autoRotateBtn.addEventListener('click', () => {
    isAutoRotating = !isAutoRotating;
    
    if (isAutoRotating) {
        cube.classList.add('auto-rotate');
        autoRotateBtn.textContent = '자동 회전 정지';
        rotateYSlider.disabled = true;
    } else {
        cube.classList.remove('auto-rotate');
        autoRotateBtn.textContent = '자동 회전';
        rotateYSlider.disabled = false;
        updateCube();
    }
});

// 리셋
resetBtn.addEventListener('click', () => {
    rotateXSlider.value = 0;
    rotateYSlider.value = 0;
    rotateZSlider.value = 0;
    scaleSlider.value = 1;
    isAutoRotating = false;
    cube.classList.remove('auto-rotate');
    autoRotateBtn.textContent = '자동 회전';
    rotateYSlider.disabled = false;
    updateCube();
});

// 텍스트 초기화
resetTextBtn.addEventListener('click', () => {
    const faceTexts = {
        'front': 'Front',
        'back': 'Back',
        'left': 'Left',
        'right': 'Right',
        'top': 'Top',
        'bottom': 'Bottom'
    };
    
    document.querySelectorAll('.face').forEach(face => {
        const faceName = face.dataset.face;
        const content = face.querySelector('.face-content');
        content.textContent = faceTexts[faceName];
        content.style.color = '';
    });
});

// 키보드 단축키
document.addEventListener('keydown', (e) => {
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
        case ' ':
            e.preventDefault();
            autoRotateBtn.click();
            break;
    }
});

// 마우스 드래그로 회전
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

cube.addEventListener('mousedown', (e) => {
    if (e.target.contentEditable === 'true') return;
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;
    
    rotateYSlider.value = parseInt(rotateYSlider.value) + deltaX;
    rotateXSlider.value = parseInt(rotateXSlider.value) - deltaY;
    
    updateCube();
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// 주사위 기능

// 큐브 상태 저장
function getCubeState() {
    const state = {};
    document.querySelectorAll('.face').forEach(face => {
        const faceName = face.dataset.face;
        const content = face.querySelector('.face-content');
        state[faceName] = {
            text: content.innerHTML,
            color: content.style.color || ''
        };
    });
    return state;
}

// 큐브 상태 복원
function setCubeState(state) {
    document.querySelectorAll('.face').forEach(face => {
        const faceName = face.dataset.face;
        const content = face.querySelector('.face-content');
        if (state[faceName]) {
            content.innerHTML = state[faceName].text;
            content.style.color = state[faceName].color;
        }
    });
}

// 저장된 큐브 목록 표시
function displaySavedCubes() {
    savedCubesDiv.innerHTML = '';
    savedCubes.forEach((cube, index) => {
        const item = document.createElement('div');
        item.className = 'saved-cube-item';
        item.innerHTML = `
            <span>${cube.name}</span>
            <button class="physics-btn" data-index="${index}">물리 엔진</button>
            <button class="delete-btn" data-index="${index}">삭제</button>
        `;
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-btn') && !e.target.classList.contains('physics-btn')) {
                setCubeState(cube.state);
                alert(`"${cube.name}" 큐브를 불러왔습니다!`);
            }
        });
        savedCubesDiv.appendChild(item);
    });
    
    // 물리 엔진 버튼 이벤트
    document.querySelectorAll('.physics-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            const cube = savedCubes[index];
            const state = cube.state;
            
            const cubeData = {
                id: Date.now(),
                name: cube.name,
                type: 'text',
                bgColor: '#ffffff',
                textColor: '#000000',
                faces: [
                    state.front?.text || 'Front',
                    state.right?.text || 'Right',
                    state.back?.text || 'Back',
                    state.left?.text || 'Left',
                    state.top?.text || 'Top',
                    state.bottom?.text || 'Bottom'
                ],
                faceColors: [
                    state.front?.color || '#000000',
                    state.right?.color || '#000000',
                    state.back?.color || '#000000',
                    state.left?.color || '#000000',
                    state.top?.color || '#000000',
                    state.bottom?.color || '#000000'
                ],
                createdAt: new Date().toISOString()
            };
            
            localStorage.setItem('selectedCustomDice', JSON.stringify(cubeData));
            window.location.href = '../11-physics-dice/index.html';
        });
    });
}

// 큐브 저장
saveCubeBtn.addEventListener('click', () => {
    const name = prompt('큐브 이름을 입력하세요:');
    if (name) {
        const state = getCubeState();
        const cubeData = {
            id: Date.now(),
            name: name,
            type: 'text',
            bgColor: '#ffffff',
            textColor: '#000000',
            faces: [
                state.front?.text || 'Front',
                state.right?.text || 'Right',
                state.back?.text || 'Back',
                state.left?.text || 'Left',
                state.top?.text || 'Top',
                state.bottom?.text || 'Bottom'
            ],
            faceColors: [
                state.front?.color || '#000000',
                state.right?.color || '#000000',
                state.back?.color || '#000000',
                state.left?.color || '#000000',
                state.top?.color || '#000000',
                state.bottom?.color || '#000000'
            ],
            createdAt: new Date().toISOString()
        };
        
        savedCubes.push({ name, state });
        localStorage.setItem('savedCubes', JSON.stringify(savedCubes));
        
        // 물리 엔진용 데이터도 저장
        localStorage.setItem('selectedCustomDice', JSON.stringify(cubeData));
        
        displaySavedCubes();
        
        // 알림 표시
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #00ff88, #00d4ff);
            color: #000;
            padding: 15px 30px;
            border-radius: 30px;
            font-weight: bold;
            z-index: 1000;
            animation: slideDown 0.5s ease;
        `;
        notification.innerHTML = `
            "${name}" 큐브가 저장되었습니다!<br>
            <a href="../11-physics-dice/index.html" style="color: #000; text-decoration: underline; font-size: 14px;">물리 엔진에서 던지기</a>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
});

// 큐브 불러오기
loadCubeBtn.addEventListener('click', () => {
    if (savedCubes.length === 0) {
        alert('저장된 큐브가 없습니다!');
        return;
    }
    displaySavedCubes();
});

// 큐브 삭제
savedCubesDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = parseInt(e.target.dataset.index);
        const name = savedCubes[index].name;
        if (confirm(`"${name}" 큐브를 삭제하시겠습니까?`)) {
            savedCubes.splice(index, 1);
            localStorage.setItem('savedCubes', JSON.stringify(savedCubes));
            displaySavedCubes();
        }
    }
});

// 주사위 던지기
rollDiceBtn.addEventListener('click', () => {
    // 현재 큐브 상태를 임시로 저장
    const tempState = getCubeState();
    localStorage.setItem('tempDiceState', JSON.stringify(tempState));
    
    // 주사위 게임 페이지로 이동
    window.location.href = 'dice-game.html';
});

// 모달 닫기
closeModalBtn.addEventListener('click', () => {
    diceResultModal.classList.remove('active');
});

diceResultModal.addEventListener('click', (e) => {
    if (e.target === diceResultModal) {
        diceResultModal.classList.remove('active');
    }
});

// 초기 저장된 큐브 표시
displaySavedCubes();

// 초기화
updateCube();