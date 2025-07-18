// Chat functionality
const messagesArea = document.getElementById('messagesArea');
const messageInput = document.getElementById('messageInput');

// Mock user data
const currentUser = {
    name: 'CoolUser123',
    avatar: 'https://via.placeholder.com/40/5865F2/ffffff?text=U'
};

// Send message
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && messageInput.value.trim()) {
        sendMessage(messageInput.value);
        messageInput.value = '';
    }
});

function sendMessage(text) {
    const message = document.createElement('div');
    message.className = 'message';
    
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    message.innerHTML = `
        <div class="message-avatar">
            <img src="${currentUser.avatar}" alt="User">
        </div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-author">${currentUser.name}</span>
                <span class="message-timestamp">Today at ${time}</span>
            </div>
            <div class="message-text">${escapeHtml(text)}</div>
        </div>
    `;
    
    messagesArea.appendChild(message);
    messagesArea.scrollTop = messagesArea.scrollHeight;
    
    // Simulate response
    if (Math.random() > 0.5) {
        setTimeout(() => {
            simulateResponse();
        }, 1000 + Math.random() * 2000);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Simulate other users
const otherUsers = [
    { name: 'Alice', avatar: 'https://via.placeholder.com/40/FF6B6B/ffffff?text=A' },
    { name: 'Bob', avatar: 'https://via.placeholder.com/40/4ECDC4/ffffff?text=B' },
    { name: 'Charlie', avatar: 'https://via.placeholder.com/40/FFD93D/ffffff?text=C' }
];

const responses = [
    'That sounds great! 😄',
    'I agree!',
    'Interesting point 🤔',
    'lol that\'s funny',
    'Anyone up for a game?',
    'Check out this cool thing I found!',
    'Nice! 👍',
    'Same here',
    'brb',
    'gg wp'
];
function simulateResponse() {
    const user = otherUsers[Math.floor(Math.random() * otherUsers.length)];
    const text = responses[Math.floor(Math.random() * responses.length)];
    
    const message = document.createElement('div');
    message.className = 'message';
    
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    message.innerHTML = `
        <div class="message-avatar">
            <img src="${user.avatar}" alt="User">
        </div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-author">${user.name}</span>
                <span class="message-timestamp">Today at ${time}</span>
            </div>
            <div class="message-text">${text}</div>
        </div>
    `;
    
    messagesArea.appendChild(message);
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

// Reaction functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.message') && e.shiftKey) {
        const message = e.target.closest('.message');
        addReaction(message);
    }
});

function addReaction(messageEl) {
    const reactions = ['👍', '❤️', '😂', '😮', '😢', '🔥'];
    const emoji = reactions[Math.floor(Math.random() * reactions.length)];
    
    let reactionsContainer = messageEl.querySelector('.message-reactions');
    if (!reactionsContainer) {
        reactionsContainer = document.createElement('div');
        reactionsContainer.className = 'message-reactions';
        messageEl.querySelector('.message-content').appendChild(reactionsContainer);
    }
    
    const existingReaction = Array.from(reactionsContainer.children).find(
        r => r.querySelector('.reaction-emoji').textContent === emoji
    );
    
    if (existingReaction) {
        const count = existingReaction.querySelector('.reaction-count');
        count.textContent = parseInt(count.textContent) + 1;
    } else {
        const reaction = document.createElement('div');
        reaction.className = 'reaction';
        reaction.innerHTML = `
            <span class="reaction-emoji">${emoji}</span>
            <span class="reaction-count">1</span>
        `;
        reactionsContainer.appendChild(reaction);
    }
}

// Channel switching
document.querySelectorAll('.channel-item').forEach(channel => {
    channel.addEventListener('click', () => {
        document.querySelectorAll('.channel-item').forEach(c => c.classList.remove('active'));
        channel.classList.add('active');
        
        // Clear messages and show new channel
        const channelName = channel.querySelector('.channel-name').textContent;
        messagesArea.innerHTML = `
            <div class="welcome-message">
                <h1>Welcome to #${channelName}!</h1>
                <p>This is the beginning of the #${channelName} channel.</p>
            </div>
        `;
    });
});

// Server switching
document.querySelectorAll('.server-item').forEach(server => {
    server.addEventListener('click', () => {
        document.querySelectorAll('.server-item').forEach(s => s.classList.remove('active'));
        server.classList.add('active');
    });
});
