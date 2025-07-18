// Social Media Feed Interactions

// Like button functionality
document.addEventListener('DOMContentLoaded', () => {
    // Handle heart/like button clicks
    const heartButtons = document.querySelectorAll('.action-btn.heart');
    
    heartButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Update likes count
            const post = this.closest('.post');
            const likesElement = post.querySelector('.post-likes span');
            const currentLikes = parseInt(likesElement.textContent);
            
            if (this.classList.contains('active')) {
                likesElement.textContent = `${currentLikes + 1} likes`;
                // Animation effect
                this.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            } else {
                likesElement.textContent = `${currentLikes - 1} likes`;
            }
        });
    });

    // Handle bookmark button clicks
    const bookmarkButtons = document.querySelectorAll('.action-btn.bookmark');
    
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === '🔖') {
                this.textContent = '📌';
                showNotification('Post saved');
            } else {
                this.textContent = '🔖';
                showNotification('Post removed from saved');
            }
        });
    });

    // Handle follow button clicks
    const followButtons = document.querySelectorAll('.follow-btn');
    
    followButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'Follow') {
                this.textContent = 'Following';
                this.style.color = 'var(--text-secondary)';
            } else {
                this.textContent = 'Follow';
                this.style.color = 'var(--accent-color)';
            }
        });
    });

    // Handle comment submission
    const commentForms = document.querySelectorAll('.add-comment');
    
    commentForms.forEach(form => {
        const input = form.querySelector('input');
        const button = form.querySelector('button');
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitComment(input);
            }
        });
        
        button.addEventListener('click', () => {
            submitComment(input);
        });
    });

    // Handle story clicks
    const stories = document.querySelectorAll('.story');
    
    stories.forEach(story => {
        story.addEventListener('click', function() {
            const ring = this.querySelector('.story-ring');
            if (ring.classList.contains('active')) {
                ring.classList.remove('active');
                showStoryModal(this);
            } else if (this.classList.contains('add-story')) {
                showNotification('Add story feature coming soon!');
            }
        });
    });

    // Handle search functionality
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.placeholder = 'Search users, hashtags...';
        });
        
        searchInput.addEventListener('blur', function() {
            this.placeholder = 'Search';
        });
    }

    // Handle post options menu
    const optionsButtons = document.querySelectorAll('.post-options');
    
    optionsButtons.forEach(button => {
        button.addEventListener('click', function() {
            showOptionsMenu(this);
        });
    });

    // Double-click to like
    const postImages = document.querySelectorAll('.post-image');
    
    postImages.forEach(image => {
        image.addEventListener('dblclick', function() {
            const post = this.closest('.post');
            const heartButton = post.querySelector('.action-btn.heart');
            
            if (!heartButton.classList.contains('active')) {
                heartButton.click();
            }
            
            // Show heart animation
            showHeartAnimation(this);
        });
    });
});

// Helper functions
function submitComment(input) {
    const comment = input.value.trim();
    if (comment) {
        showNotification('Comment posted!');
        input.value = '';
        
        // Update comment count
        const post = input.closest('.post');
        const viewComments = post.querySelector('.view-comments');
        const match = viewComments.textContent.match(/\d+/);
        if (match) {
            const count = parseInt(match[0]) + 1;
            viewComments.textContent = `View all ${count} comments`;
        }
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideUp 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

function showStoryModal(storyElement) {
    // Simplified story viewer
    const modal = document.createElement('div');
    modal.className = 'story-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
    `;
    content.innerHTML = `
        <h3>Story by ${storyElement.querySelector('.story-username').textContent}</h3>
        <p>Story viewer coming soon!</p>
        <button onclick="this.closest('.story-modal').remove()" style="margin-top: 10px; padding: 8px 16px; background: var(--accent-color); color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function showOptionsMenu(button) {
    const menu = document.createElement('div');
    menu.className = 'options-menu';
    menu.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 20px rgba(0,0,0,0.2);
        overflow: hidden;
        z-index: 1000;
    `;
    
    const options = [
        { text: 'Report', action: () => showNotification('Post reported') },
        { text: 'Unfollow', action: () => showNotification('Unfollowed') },
        { text: 'Go to post', action: () => showNotification('Opening post...') },
        { text: 'Share to...', action: () => showNotification('Share menu coming soon') },
        { text: 'Copy link', action: () => showNotification('Link copied!') },
        { text: 'Cancel', action: () => menu.remove() }
    ];
    
    options.forEach(option => {
        const item = document.createElement('button');
        item.textContent = option.text;
        item.style.cssText = `
            display: block;
            width: 100%;
            padding: 14px 16px;
            border: none;
            background: white;
            text-align: center;
            cursor: pointer;
            border-bottom: 1px solid #efefef;
        `;
        
        if (option.text === 'Report' || option.text === 'Unfollow') {
            item.style.color = '#ed4956';
            item.style.fontWeight = 'bold';
        }
        
        item.addEventListener('click', () => {
            option.action();
            menu.remove();
        });
        
        menu.appendChild(item);
    });
    
    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.65);
        z-index: 999;
    `;
    
    backdrop.addEventListener('click', () => {
        menu.remove();
        backdrop.remove();
    });
    
    document.body.appendChild(backdrop);
    document.body.appendChild(menu);
}

function showHeartAnimation(imageContainer) {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-size: 80px;
        animation: heartPop 0.8s ease-out;
        pointer-events: none;
    `;
    
    imageContainer.style.position = 'relative';
    imageContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 800);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
        }
    }
    
    @keyframes heartPop {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Infinite scroll simulation
let loadingMore = false;
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && !loadingMore) {
        loadingMore = true;
        
        // Show loading indicator
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.style.cssText = `
            text-align: center;
            padding: 20px;
            font-size: 24px;
        `;
        loader.textContent = '⌛';
        
        const postsContainer = document.querySelector('.posts-container');
        postsContainer.appendChild(loader);
        
        // Simulate loading more posts
        setTimeout(() => {
            loader.remove();
            showNotification('No more posts to load');
            loadingMore = false;
        }, 1500);
    }
});