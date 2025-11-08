// Product Data
const products = [
    // Live Plants
    { id: 1, name: 'Monstera Deliciosa', price: 899, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500', category: 'live-plants' },
    { id: 2, name: 'Snake Plant', price: 449, image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb4?w=500', category: 'live-plants' },
    { id: 3, name: 'Fiddle Leaf Fig', price: 1299, image: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b58?w=500', category: 'live-plants' },
    { id: 4, name: 'Pothos Golden', price: 349, image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=500', category: 'live-plants' },
    
    // Artificial Plants
    { id: 5, name: 'Faux Eucalyptus', price: 699, image: 'https://images.unsplash.com/photo-1618016165825-329fd06e7cee?w=500', category: 'artificial-plants' },
    { id: 6, name: 'Artificial Succulent Set', price: 549, image: 'https://images.unsplash.com/photo-1617807000768-34a3e8b4fb98?w=500', category: 'artificial-plants' },
    { id: 7, name: 'Fake Fern Plant', price: 799, image: 'https://images.unsplash.com/photo-1606069842439-f9be73fc0a1a?w=500', category: 'artificial-plants' },
    { id: 8, name: 'Decorative Palm', price: 999, image: 'https://images.unsplash.com/photo-1616695173872-e57c4cf2f4bd?w=500', category: 'artificial-plants' },
    
    // Soil
    { id: 9, name: 'Organic Potting Mix', price: 249, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500', category: 'soil' },
    { id: 10, name: 'Cactus Soil Blend', price: 199, image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=500', category: 'soil' },
    { id: 11, name: 'Premium Garden Soil', price: 299, image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=500', category: 'soil' },
    { id: 12, name: 'Seedling Starter Mix', price: 179, image: 'https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=500', category: 'soil' },
    
    // Fertilizers
    { id: 13, name: 'Organic Compost', price: 349, image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=500', category: 'fertilizers' },
    { id: 14, name: 'Liquid Plant Food', price: 449, image: 'https://images.unsplash.com/photo-1585571395297-e9bd33a7c1d0?w=500', category: 'fertilizers' },
    { id: 15, name: 'All-Purpose Fertilizer', price: 299, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500', category: 'fertilizers' },
    { id: 16, name: 'Vermicompost 5kg', price: 399, image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500', category: 'fertilizers' }
];

// Cart Array
let cart = [];

// Product quantities (track quantity for each product before adding to cart)
let productQuantities = {};

// Initialize App
function init() {
    // Initialize all product quantities to 1
    products.forEach(product => {
        productQuantities[product.id] = 1;
    });
    
    renderPage();
    setupEventListeners();
    
    // Handle hash change for routing
    window.addEventListener('hashchange', renderPage);
    
    // Default to live-plants if no hash
    if (!window.location.hash) {
        window.location.hash = '#/live-plants';
    }
}

// Setup Event Listeners
function setupEventListeners() {
    const cartIcon = document.getElementById('cartIcon');
    const closeCart = document.getElementById('closeCart');
    const overlay = document.getElementById('overlay');
    
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);
}

// Toggle Cart Sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Render Page Based on Hash
function renderPage() {
    const hash = window.location.hash || '#/live-plants';
    const app = document.getElementById('app');
    
    if (hash === '#/live-plants') {
        app.innerHTML = renderProducts('live-plants', 'Live Plants');
    } else if (hash === '#/artificial-plants') {
        app.innerHTML = renderProducts('artificial-plants', 'Artificial Plants');
    } else if (hash === '#/soil') {
        app.innerHTML = renderProducts('soil', 'Soil & Potting Mix');
    } else if (hash === '#/fertilizers') {
        app.innerHTML = renderProducts('fertilizers', 'Fertilizers & Nutrients');
    }
    
    attachProductButtons();
}

// Render Product Page
function renderProducts(category, title) {
    const categoryProducts = products.filter(p => p.category === category);
    
    return `
        <div class="product-section">
            <div class="container">
                <h2>${title}</h2>
                <div class="product-grid">
                    ${categoryProducts.map(product => `
                        <div class="product-card">
                            <img src="${product.image}" alt="${product.name}" class="product-image">
                            <div class="product-info">
                                <div class="product-name">${product.name}</div>
                                <div class="product-price">₹${product.price}</div>
                                
                                <div class="product-quantity-controls">
                                    <label>Qty:</label>
                                    <button class="product-qty-btn" data-action="decrease" data-id="${product.id}">-</button>
                                    <span class="product-quantity" id="qty-${product.id}">${productQuantities[product.id]}</span>
                                    <button class="product-qty-btn" data-action="increase" data-id="${product.id}">+</button>
                                </div>
                                
                                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Attach Event Listeners to Product Buttons
function attachProductButtons() {
    // Add to cart buttons
    const addButtons = document.querySelectorAll('.add-to-cart-btn');
    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    // Quantity buttons
    const qtyButtons = document.querySelectorAll('.product-qty-btn');
    qtyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.getAttribute('data-id'));
            const action = btn.getAttribute('data-action');
            
            if (action === 'increase') {
                productQuantities[productId]++;
            } else if (action === 'decrease' && productQuantities[productId] > 1) {
                productQuantities[productId]--;
            }
            
            // Update display
            document.getElementById(`qty-${productId}`).textContent = productQuantities[productId];
        });
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = productQuantities[productId];
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }
    
    // Reset product quantity to 1 after adding
    productQuantities[productId] = 1;
    document.getElementById(`qty-${productId}`).textContent = 1;
    
    updateCart();
}

// Update Cart Display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total;
    
    // Render cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-details">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                    <span class="cart-item-price">₹${item.price * item.quantity}</span>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
    }
}

// Increase Quantity (in cart)
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Decrease Quantity (in cart)
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Start the app
init();
