// Floating icons animation
const icons = ['🛍️', '✨', '💎', '👑', '🌟', '💫', '🔮', '💜'];
const floatingContainer = document.getElementById('floatingIcons');

function createFloatingIcon() {
    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.textContent = icons[Math.floor(Math.random() * icons.length)];
    icon.style.left = Math.random() * 100 + '%';
    icon.style.top = Math.random() * 100 + '%';
    icon.style.animationDelay = Math.random() * 6 + 's';
    floatingContainer.appendChild(icon);
    
    setTimeout(() => icon.remove(), 12000);
}

// Create floating icons periodically
setInterval(createFloatingIcon, 1000);

// Real products from New Voices Fund portfolio companies
const products = {
    all: [
        // The Lip Bar
        {name: 'Bawse Lady Lipstick', price: '$15', emoji: '💄', category: 'datenight', brand: 'The Lip Bar', description: 'Vegan red lipstick'},
        {name: 'Fast Face Kit', price: '$55', emoji: '✨', category: 'selfcare', brand: 'The Lip Bar', description: 'Complete makeup kit'},
        
        // UOMA Beauty
        {name: 'Say What?! Foundation', price: '$40', emoji: '🎨', category: 'selfcare', brand: 'UOMA Beauty', description: '51 shades of inclusive beauty'},
        {name: 'Drama Bomb Mascara', price: '$26', emoji: '👁️', category: 'datenight', brand: 'UOMA Beauty', description: 'Volumizing mascara'},
        
        // Topicals
        {name: 'Faded Serum', price: '$38', emoji: '🌟', category: 'selfcare', brand: 'Topicals', description: 'Brightening & clearing serum'},
        {name: 'Like Butter Mask', price: '$34', emoji: '🧈', category: 'selfcare', brand: 'Topicals', description: 'Hydrating face mask'},
        
        // The Honey Pot
        {name: 'Herbal Pads', price: '$8.99', emoji: '🌿', category: 'wellness', brand: 'The Honey Pot', description: 'Organic feminine care'},
        {name: 'Sensitive Wash', price: '$9.99', emoji: '💧', category: 'wellness', brand: 'The Honey Pot', description: 'pH balanced cleanser'},
        
        // NaturAll Club
        {name: 'Fresh Avocado Deep Conditioner', price: '$35', emoji: '🥑', category: 'blackowned', brand: 'NaturAll Club', description: 'Natural hair treatment'},
        {name: 'Jamaican Black Castor Oil', price: '$25', emoji: '💇🏾‍♀️', category: 'blackowned', brand: 'NaturAll Club', description: 'Hair growth oil'},
        
        // Beauty Bakerie
        {name: 'Lip Whip', price: '$20', emoji: '🍰', category: 'datenight', brand: 'Beauty Bakerie', description: 'Long-wear liquid lipstick'},
        {name: 'Setting Powder', price: '$24', emoji: '💎', category: 'selfcare', brand: 'Beauty Bakerie', description: 'Flour setting powder'},
        
        // Mented Cosmetics
        {name: 'Nude LaLa Lipstick', price: '$17', emoji: '💋', category: 'datenight', brand: 'Mented', description: 'Nude for all skin tones'},
        {name: 'Skin Silk Foundation', price: '$29', emoji: '✨', category: 'selfcare', brand: 'Mented', description: 'Lightweight coverage'},
        
        // Rosen Skincare
        {name: 'Super Smoothie Cleanser', price: '$18', emoji: '🫧', category: 'selfcare', brand: 'ROSEN', description: 'Gentle gel cleanser'},
        {name: 'Break-Out Spot Treatment', price: '$12', emoji: '🎯', category: 'selfcare', brand: 'ROSEN', description: 'Acne treatment'},
        
        // Young King Hair Care
        {name: 'Leave-In Conditioner', price: '$14', emoji: '👑', category: 'blackowned', brand: 'Young King', description: 'For textured hair'},
        {name: 'Curl Cream', price: '$16', emoji: '🌊', category: 'blackowned', brand: 'Young King', description: 'Define those curls'},
        
        // Healthy Roots Dolls
        {name: 'Zoe Doll', price: '$89', emoji: '🪆', category: 'blackowned', brand: 'Healthy Roots', description: 'Empowering dolls'},
        {name: 'Storybook Collection', price: '$25', emoji: '📚', category: 'blackowned', brand: 'Healthy Roots', description: 'Identity-affirming stories'}
    ]
};

let currentProducts = products.all;
let screens = ['landing', 'building', 'store', 'purchase', 'confirmation', 'extension'];
let currentScreen = 0;

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function startBuilding() {
    const input = document.getElementById('socialInput').value;
    if (!input.trim()) {
        alert('Please enter a social handle!');
        return;
    }
    
    showScreen('building');
    
    const messages = [
        'Scrying your selfies...',
        'Scanning your spice rack...',
        'Peeking into your Pinterest soul...',
        'Analyzing your aesthetic...',
        'Curating your vibe...'
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
        document.getElementById('buildingSubtext').textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length;
    }, 800);
    
    setTimeout(() => {
        clearInterval(messageInterval);
        showScreen('store');
        populateProducts(currentProducts);
    }, 4000);
}

function populateProducts(productList) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    
    productList.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-brand" style="font-size: 0.85rem; color: #667eea; margin-bottom: 0.3rem;">${product.brand}</div>
            <div class="product-price">${product.price}</div>
            <div class="product-description" style="font-size: 0.8rem; opacity: 0.7; margin-top: 0.5rem;">${product.description}</div>
        `;
        card.style.animationDelay = (index * 0.1) + 's';
        grid.appendChild(card);
    });
}

function filterProducts(category) {
    if (category === 'all') {
        currentProducts = products.all;
    } else {
        currentProducts = products.all.filter(product => product.category === category);
    }
    populateProducts(currentProducts);
}

// Chat functionality
document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const message = this.value.trim();
        if (message) {
            addChatMessage(message, 'user');
            this.value = '';
            
            // Simulate AI response with brand mentions
            setTimeout(() => {
                let aiResponse = "I got you! Let me find exactly what you need from our curated Black-owned brands. ✨";
                if (message.toLowerCase().includes('hair')) {
                    aiResponse = "Perfect! I see you need some hair love. NaturAll Club's Fresh Avocado Deep Conditioner and Young King's curl products are amazing for textured hair. Check them out! 💇🏾‍♀️";
                    filterProducts('blackowned');
                } else if (message.toLowerCase().includes('date')) {
                    aiResponse = "Ooh, date night! The Lip Bar's Bawse Lady lipstick and UOMA Beauty's Drama Bomb mascara will have you looking stunning. 💕";
                    filterProducts('datenight');
                } else if (message.toLowerCase().includes('self care') || message.toLowerCase().includes('glow')) {
                    aiResponse = "Self-care Sunday vibes! Topicals' Faded Serum and ROSEN's Super Smoothie cleanser will have your skin glowing. ✨";
                    filterProducts('selfcare');
                } else if (message.toLowerCase().includes('period') || message.toLowerCase().includes('feminine')) {
                    aiResponse = "The Honey Pot has you covered with their herbal pads and pH-balanced products. Natural care for your most intimate needs! 🌿";
                    filterProducts('wellness');
                }
                addChatMessage(aiResponse, 'ai');
            }, 1000);
        }
    }
});

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function startPurchase() {
    showScreen('purchase');
    
    const messages = [
        'Calculating savings...',
        'Making that money move...',
        'Supporting the culture...',
        'Almost there...'
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
        document.getElementById('purchaseText').textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length;
    }, 1000);
    
    setTimeout(() => {
        clearInterval(messageInterval);
        showScreen('confirmation');
    }, 4500);
}

function showExtension() {
    showScreen('extension');
}

function simulateInstall() {
    // Simulate installation process
    const button = event.target;
    button.innerHTML = '<span class="chrome-icon">⏳</span> Installing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<span class="chrome-icon">✅</span> Installed!';
        button.style.background = 'linear-gradient(45deg, #28ca42, #2d5016)';
        
        // Show success message
        setTimeout(() => {
            alert('SPILL Extension installed! 🎉\n\nNow when you shop on any site, we\'ll find Black-owned alternatives for you automatically.');
            resetToLanding();
        }, 1000);
    }, 2000);
}

function resetToLanding() {
    showScreen('landing');
    document.getElementById('socialInput').value = '';
    document.getElementById('chatMessages').innerHTML = '<div class="message ai">Hey there! I\'m SPILL, your personal shopping companion. What are you looking for today? 🛍️</div>';
    currentProducts = products.all;
}

// Initialize
populateProducts(products.all);