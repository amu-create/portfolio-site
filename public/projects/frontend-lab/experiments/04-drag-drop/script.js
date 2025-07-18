// 드래그 앤 드롭 기능 구현
let draggedElement = null;
let taskCounter = 4; // 기존 4개 태스크가 있음

// 모든 드래그 가능한 요소와 드롭 존 가져오기
const dropZones = document.querySelectorAll('.drop-zone');
const addTaskBtn = document.querySelector('.add-task');
const resetBtn = document.querySelector('.reset');

// 초기 설정
function initializeDragAndDrop() {
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('dragenter', handleDragEnter);
    });
}

// 드래그 시작
function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

// 드래그 종료
function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // 모든 드롭존의 drag-over 클래스 제거
    dropZones.forEach(zone => {
        zone.classList.remove('drag-over');
    });
    
    updateStats();
}

// 드래그 오버
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

// 드래그 진입
function handleDragEnter(e) {
    this.classList.add('drag-over');
}

// 드래그 이탈
function handleDragLeave(e) {
    if (e.target.classList.contains('drop-zone')) {
        this.classList.remove('drag-over');
    }
}

// 드롭 처리
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== null) {
        this.appendChild(draggedElement);
        
        // 애니메이션 효과
        draggedElement.style.animation = 'none';
        setTimeout(() => {
            draggedElement.style.animation = 'fadeIn 0.3s ease-out';
        }, 10);
    }
    
    return false;
}

// 새 작업 추가
function addNewTask() {
    taskCounter++;
    
    const priorities = ['high', 'medium', 'low'];
    const icons = ['🎨', '📱', '🔧', '📈', '🎯', '💡'];
    const tasks = [
        { title: '백엔드 API 개발', desc: 'RESTful API 엔드포인트 구현' },
        { title: '테스트 코드 작성', desc: '단위 테스트 및 통합 테스트' },
        { title: '문서화 작업', desc: 'API 문서 및 사용자 가이드' },
        { title: '성능 최적화', desc: '로딩 시간 및 응답 속도 개선' },
        { title: '보안 점검', desc: '취약점 스캔 및 보안 패치' }
    ];
    
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    
    const newTask = document.createElement('div');
    newTask.className = 'task-item';
    newTask.draggable = true;
    newTask.dataset.id = taskCounter;
    newTask.innerHTML = `
        <span class="task-icon">${randomIcon}</span>
        <h3>${randomTask.title}</h3>
        <p>${randomTask.desc}</p>
        <span class="priority ${randomPriority}">${
            randomPriority === 'high' ? '높음' : 
            randomPriority === 'medium' ? '중간' : '낮음'
        }</span>
    `;
    
    // 이벤트 리스너 추가
    newTask.addEventListener('dragstart', handleDragStart);
    newTask.addEventListener('dragend', handleDragEnd);
    
    // 할 일 목록에 추가
    document.getElementById('todoZone').appendChild(newTask);
    
    updateStats();
}

// 통계 업데이트
function updateStats() {
    const totalTasks = document.querySelectorAll('.task-item').length;
    const doneTasks = document.querySelectorAll('#doneZone .task-item').length;
    const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
    
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completionRate').textContent = completionRate + '%';
}

// 초기화
function resetTasks() {
    // 모든 작업을 할 일로 이동
    const allTasks = document.querySelectorAll('.task-item');
    const todoZone = document.getElementById('todoZone');
    
    allTasks.forEach(task => {
        todoZone.appendChild(task);
    });
    
    updateStats();
}

// 이벤트 리스너
addTaskBtn.addEventListener('click', addNewTask);
resetBtn.addEventListener('click', resetTasks);

// 초기화
initializeDragAndDrop();
updateStats();