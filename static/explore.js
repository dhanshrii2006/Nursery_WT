// ==================== PRODUCT DATA ====================document.addEventListener('DOMContentLoaded', () => {

const products = {

    'live-plants': [    // --- 1. PRODUCT DATA (4 products per category) ---

        { id: 1, name: 'Monstera Deliciosa', price: 35.99, image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=400&fit=crop', category: 'live-plants' },    const allProducts = {

        { id: 2, name: 'Snake Plant', price: 28.99, image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd00a83?w=400&h=400&fit=crop', category: 'live-plants' },        'live-plants': [

        { id: 3, name: 'Pothos Vine', price: 22.99, image: 'https://images.unsplash.com/photo-1530968033265-8be77fdc88cc?w=400&h=400&fit=crop', category: 'live-plants' },            { 

        { id: 4, name: 'Spider Plant', price: 18.99, image: 'https://images.unsplash.com/photo-1630747463249-47e37a31d2e8?w=400&h=400&fit=crop', category: 'live-plants' }                id: 'lp1', 

    ],                name: 'Monstera Deliciosa', 

    'artificial-plants': [                price: 35.00, 

        { id: 5, name: 'Faux Fiddle Leaf Fig', price: 65.99, image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop', category: 'artificial-plants' },                img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=300&h=300&fit=crop',

        { id: 6, name: 'Artificial Orchid', price: 40.99, image: 'https://images.unsplash.com/photo-1611857272156-8e48abc4caab?w=400&h=400&fit=crop', category: 'artificial-plants' },                category: 'live-plants'

        { id: 7, name: 'Fake Fern', price: 32.99, image: 'https://images.unsplash.com/photo-1514928528679-752a1d582e8d?w=400&h=400&fit=crop', category: 'artificial-plants' },            },

        { id: 8, name: 'Synthetic Ivy Plant', price: 28.99, image: 'https://images.unsplash.com/photo-1598243417276-e2fb9e57bd21?w=400&h=400&fit=crop', category: 'artificial-plants' }            { 

    ],                id: 'lp2', 

    'soil': [                name: 'Snake Plant', 

        { id: 9, name: 'Premium Potting Mix', price: 15.99, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop', category: 'soil' },                price: 28.00, 

        { id: 10, name: 'Cactus & Succulent Soil', price: 18.99, image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd00a83?w=400&h=400&fit=crop', category: 'soil' },                img: 'https://images.unsplash.com/photo-1632119220175-4902230e146f?w=300&h=300&fit=crop',

        { id: 11, name: 'All-Purpose Fertilizer', price: 22.99, image: 'https://images.unsplash.com/photo-1559966847-9d4c2b2e5e9e?w=400&h=400&fit=crop', category: 'soil' },                category: 'live-plants'

        { id: 12, name: 'Organic Compost', price: 20.99, image: 'https://images.unsplash.com/photo-1592634318149-0edc9bb63eb9?w=400&h=400&fit=crop', category: 'soil' }            },

    ],            { 

    'fertilizers': [                id: 'lp3', 

        { id: 13, name: 'Liquid NPK Fertilizer', price: 24.99, image: 'https://images.unsplash.com/photo-1584622666411-993e426fbf1a?w=400&h=400&fit=crop', category: 'fertilizers' },                name: 'Pothos Vine', 

        { id: 14, name: 'Organic Plant Food', price: 19.99, image: 'https://images.unsplash.com/photo-1597474748169-2b01373b324d?w=400&h=400&fit=crop', category: 'fertilizers' },                price: 22.00, 

        { id: 15, name: 'Slow-Release Pellets', price: 26.99, image: 'https://images.unsplash.com/photo-1585194439976-40fad2e4b16c?w=400&h=400&fit=crop', category: 'fertilizers' },                img: 'https://images.unsplash.com/photo-1604175481369-902eac612519?w=300&h=300&fit=crop',

        { id: 16, name: 'Micronutrient Spray', price: 16.99, image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=400&fit=crop', category: 'fertilizers' }                category: 'live-plants'

    ]            },

};            { 

                id: 'lp4', 

// ==================== CART DATA ====================                name: 'Spider Plant', 

let cart = [];                price: 18.00, 

                img: 'https://images.unsplash.com/photo-1597848212624-59812c2f0fc2?w=300&h=300&fit=crop',

// ==================== DOM ELEMENTS ====================                category: 'live-plants'

const cartToggle = document.getElementById('cartToggle');            }

const cartSidebar = document.getElementById('cartSidebar');        ],

const overlay = document.getElementById('overlay');        'artificial-plants': [

const closeCart = document.getElementById('closeCart');            { 

const cartItems = document.getElementById('cartItems');                id: 'ap1', 

const cartTotal = document.getElementById('cartTotal');                name: 'Faux Fiddle Leaf Fig', 

const cartCount = document.getElementById('cartCount');                price: 65.00, 

                img: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd4b37f?w=300&h=300&fit=crop',

// ==================== INITIALIZATION ====================                category: 'artificial-plants'

document.addEventListener('DOMContentLoaded', () => {            },

    handleRouteChange();            { 

    setupEventListeners();                id: 'ap2', 

});                name: 'Artificial Orchid', 

                price: 40.00, 

window.addEventListener('hashchange', handleRouteChange);                img: 'https://images.unsplash.com/photo-1615878519454-a3d7a50b32f1?w=300&h=300&fit=crop',

                category: 'artificial-plants'

// ==================== EVENT LISTENERS ====================            },

function setupEventListeners() {            { 

    cartToggle.addEventListener('click', toggleCart);                id: 'ap3', 

    closeCart.addEventListener('click', toggleCart);                name: 'Fake Fern', 

    overlay.addEventListener('click', toggleCart);                price: 32.00, 

}                img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',

                category: 'artificial-plants'

// ==================== ROUTING ====================            },

function handleRouteChange() {            { 

    const hash = window.location.hash.slice(1) || '/home';                id: 'ap4', 

    const page = hash.split('/')[1] || 'home';                name: 'Synthetic Ivy Plant', 

                    price: 28.00, 

    // Hide all pages                img: 'https://images.unsplash.com/photo-1612521534527-b4e2fbf0a6e4?w=300&h=300&fit=crop',

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));                category: 'artificial-plants'

                }

    // Show current page        ],

    const currentPage = document.getElementById(page);        'soil': [

    if (currentPage) {            { 

        currentPage.classList.add('active');                id: 's1', 

    }                name: 'Premium Potting Mix', 

                    price: 15.00, 

    // Update nav links                img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=300&fit=crop',

    document.querySelectorAll('.nav-link').forEach(link => {                category: 'soil'

        link.classList.remove('active');            },

        if (link.getAttribute('href').includes(page)) {            { 

            link.classList.add('active');                id: 's2', 

        }                name: 'Cactus & Succulent Soil', 

    });                price: 18.00, 

                    img: 'https://images.unsplash.com/photo-1600832674773-26d3a9e3c4c5?w=300&h=300&fit=crop',

    // Render products if it's a product page                category: 'soil'

    if (page !== 'home') {            },

        renderProducts(page);            { 

    }                id: 's3', 

}                name: 'All-Purpose Fertilizer', 

                price: 22.00, 

function handleNavClick(event) {                img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=300&fit=crop',

    event.preventDefault();                category: 'soil'

}            },

            { 

function navigateTo(route) {                id: 's4', 

    window.location.hash = route;                name: 'Organic Compost', 

}                price: 20.00, 

                img: 'https://images.unsplash.com/photo-1600832674773-26d3a9e3c4c5?w=300&h=300&fit=crop',

// ==================== PRODUCT RENDERING ====================                category: 'soil'

function renderProducts(category) {            }

    const gridId = {        ]

        'live-plants': 'livePlantsGrid',    };

        'artificial-plants': 'artificialPlantsGrid',

        'soil': 'soilGrid',    const categoryTitles = {

        'fertilizers': 'fertilizersGrid'        'live-plants': '🌱 Live Plants',

    }[category];        'artificial-plants': '🎨 Artificial Plants',

        'soil': '🌍 Soil & Fertilizers'

    const grid = document.getElementById(gridId);    };

    if (!grid) return;

    // --- 2. DOM ELEMENTS ---

    const categoryProducts = products[category] || [];    const productGrid = document.getElementById('product-grid');

    grid.innerHTML = categoryProducts.map(product => createProductCard(product)).join('');    const pageTitle = document.getElementById('page-title');

        const categoryLinks = document.querySelectorAll('.category-link');

    // Attach event listeners to newly created buttons    const cartToggle = document.getElementById('cart-toggle');

    grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {    const cartModal = document.getElementById('cart-modal');

        btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.productId)));    const cartOverlay = document.getElementById('cart-overlay');

    });    const cartCloseBtn = document.getElementById('cart-close');

    const cartItemsList = document.getElementById('cart-items-list');

    grid.querySelectorAll('.qty-btn').forEach(btn => {    const cartTotalEl = document.getElementById('cart-total');

        btn.addEventListener('click', (e) => {    const cartItemCountEl = document.getElementById('cart-item-count');

            const productId = parseInt(btn.dataset.productId);    const checkoutBtn = document.getElementById('checkout-btn');

            const action = btn.dataset.action;

            if (action === 'minus') decreaseQty(productId);    // Cart state

            if (action === 'plus') increaseQty(productId);    let cart = JSON.parse(localStorage.getItem('nurseryCart')) || [];

        });

    });    // --- 3. CORE FUNCTIONS ---

}

    /**

function createProductCard(product) {     * Render products for a category

    const inCart = cart.find(item => item.id === product.id);     */

        function renderProducts(category) {

    if (inCart) {        productGrid.innerHTML = '';

        return `        pageTitle.textContent = categoryTitles[category] || 'Products';

            <div class="product-card">

                <img src="${product.image}" alt="${product.name}" class="product-image">        const products = allProducts[category] || [];

                <div class="product-info">

                    <div class="product-name">${product.name}</div>        if (products.length === 0) {

                    <div class="product-price">$${product.price.toFixed(2)}</div>            productGrid.innerHTML = '<p>No products found.</p>';

                    <div class="quantity-controls">            return;

                        <button class="qty-btn" data-product-id="${product.id}" data-action="minus">−</button>        }

                        <div class="qty-display">${inCart.qty}</div>

                        <button class="qty-btn" data-product-id="${product.id}" data-action="plus">+</button>        products.forEach(product => {

                    </div>            const cartItem = cart.find(item => item.id === product.id);

                </div>            const quantity = cartItem ? cartItem.quantity : 0;

            </div>

        `;            const card = document.createElement('div');

    }            card.className = 'product-card';

                card.innerHTML = `

    return `                <img src="${product.img}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x300?text=Image+Not+Found'">

        <div class="product-card">                <div class="product-info">

            <img src="${product.image}" alt="${product.name}" class="product-image">                    <div class="product-name">${product.name}</div>

            <div class="product-info">                    <div class="product-price">$${product.price.toFixed(2)}</div>

                <div class="product-name">${product.name}</div>                    <div class="product-actions">

                <div class="product-price">$${product.price.toFixed(2)}</div>                        ${quantity === 0 ? `

                <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>                            <button class="add-to-cart-btn" data-id="${product.id}">+ Add to Cart</button>

            </div>                        ` : `

        </div>                            <div class="quantity-controls">

    `;                                <button class="quantity-btn qty-decrease" data-id="${product.id}">−</button>

}                                <div class="quantity-display">${quantity}</div>

                                <button class="quantity-btn qty-increase" data-id="${product.id}">+</button>

// ==================== CART OPERATIONS ====================                            </div>

function addToCart(productId) {                        `}

    const product = getAllProducts().find(p => p.id === productId);                    </div>

    if (!product) return;                </div>

            `;

    const existingItem = cart.find(item => item.id === productId);            productGrid.appendChild(card);

    if (existingItem) {        });

        existingItem.qty++;    }

    } else {

        cart.push({ ...product, qty: 1 });    /**

    }     * Add product to cart

     */

    updateCart();    function addToCart(productId) {

    const currentPage = window.location.hash.slice(1).split('/')[1];        let found = false;

    if (currentPage !== 'home') {        

        renderProducts(currentPage);        for (const category in allProducts) {

    }            const product = allProducts[category].find(p => p.id === productId);

}            if (product) {

                const cartItem = cart.find(item => item.id === productId);

function increaseQty(productId) {                if (!cartItem) {

    const item = cart.find(item => item.id === productId);                    cart.push({ ...product, quantity: 1 });

    if (item) {                }

        item.qty++;                found = true;

        updateCart();                break;

        const currentPage = window.location.hash.slice(1).split('/')[1];            }

        renderProducts(currentPage);        }

    }

}        saveCart();

        updateCartDisplay();

function decreaseQty(productId) {        

    const item = cart.find(item => item.id === productId);        // Re-render current category

    if (item && item.qty > 1) {        const activeCategory = document.querySelector('.category-link.active');

        item.qty--;        if (activeCategory) {

        updateCart();            renderProducts(activeCategory.dataset.category);

        const currentPage = window.location.hash.slice(1).split('/')[1];        }

        renderProducts(currentPage);    }

    }

}    /**

     * Update quantity

function removeFromCart(productId) {     */

    cart = cart.filter(item => item.id !== productId);    function updateQuantity(productId, change) {

    updateCart();        const cartItem = cart.find(item => item.id === productId);

    const currentPage = window.location.hash.slice(1).split('/')[1];        if (!cartItem) return;

    if (currentPage !== 'home') {

        renderProducts(currentPage);        cartItem.quantity += change;

    }        

}        if (cartItem.quantity <= 0) {

            removeFromCart(productId);

function updateCart() {            return;

    updateCartDisplay();        }

    updateCartCount();

}        saveCart();

        updateCartDisplay();

function updateCartDisplay() {        

    const cartItemsContainer = document.getElementById('cartItems');        // Re-render current category

            const activeCategory = document.querySelector('.category-link.active');

    if (cart.length === 0) {        if (activeCategory) {

        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';            renderProducts(activeCategory.dataset.category);

        cartTotal.textContent = '0.00';        }

        return;    }

    }

    /**

    cartItemsContainer.innerHTML = cart.map(item => `     * Remove from cart

        <div class="cart-item">     */

            <img src="${item.image}" alt="${item.name}" class="cart-item-image">    function removeFromCart(productId) {

            <div class="cart-item-details">        cart = cart.filter(item => item.id !== productId);

                <div class="cart-item-name">${item.name}</div>        saveCart();

                <div class="cart-item-price">$${item.price.toFixed(2)}</div>        updateCartDisplay();

                <div class="cart-item-qty">        

                    <button class="qty-mini-btn" onclick="decreaseQty(${item.id})">−</button>        // Re-render current category

                    <span class="qty-mini-display">${item.qty}</span>        const activeCategory = document.querySelector('.category-link.active');

                    <button class="qty-mini-btn" onclick="increaseQty(${item.id})">+</button>        if (activeCategory) {

                </div>            renderProducts(activeCategory.dataset.category);

                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>        }

            </div>    }

        </div>

    `).join('');    /**

     * Save cart to localStorage

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);     */

    cartTotal.textContent = total.toFixed(2);    function saveCart() {

}        localStorage.setItem('nurseryCart', JSON.stringify(cart));

    }

function updateCartCount() {

    const count = cart.reduce((sum, item) => sum + item.qty, 0);    /**

    cartCount.textContent = count;     * Update cart display modal

}     */

    function updateCartDisplay() {

function toggleCart() {        cartItemsList.innerHTML = '';

    cartSidebar.classList.toggle('active');        let total = 0;

    overlay.classList.toggle('active');        let totalItems = 0;

}

        if (cart.length === 0) {

function handleCheckout() {            cartItemsList.innerHTML = '<div class="cart-empty">🛒 Your cart is empty</div>';

    if (cart.length === 0) {        } else {

        alert('Your cart is empty!');            cart.forEach(item => {

        return;                total += item.price * item.quantity;

    }                totalItems += item.quantity;

    alert('✅ Order placed successfully! Thank you for shopping with Nursery.');

    cart = [];                const cartItemEl = document.createElement('div');

    updateCart();                cartItemEl.className = 'cart-item';

    toggleCart();                cartItemEl.innerHTML = `

}                    <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80?text=Image'">

                    <div class="cart-item-details">

// ==================== HELPER FUNCTIONS ====================                        <div class="cart-item-name">${item.name}</div>

function getAllProducts() {                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>

    return Object.values(products).flat();                        <div class="cart-item-controls">

}                            <div class="quantity-control-mini">

                                <button class="qty-decrease-cart" data-id="${item.id}">−</button>
                                <span>${item.quantity}</span>
                                <button class="qty-increase-cart" data-id="${item.id}">+</button>
                            </div>
                            <button class="remove-btn" data-id="${item.id}">Remove</button>
                        </div>
                    </div>
                `;
                cartItemsList.appendChild(cartItemEl);
            });
        }

        cartTotalEl.textContent = total.toFixed(2);
        cartItemCountEl.textContent = totalItems;
    }

    /**
     * Toggle cart modal
     */
    function toggleCartModal() {
        cartModal.classList.toggle('visible');
        cartOverlay.classList.toggle('visible');
    }

    // --- 4. EVENT LISTENERS ---

    // Category navigation
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            renderProducts(link.dataset.category);
        });
    });

    // Add to cart buttons
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            addToCart(e.target.dataset.id);
        } else if (e.target.classList.contains('qty-increase')) {
            updateQuantity(e.target.dataset.id, 1);
        } else if (e.target.classList.contains('qty-decrease')) {
            updateQuantity(e.target.dataset.id, -1);
        }
    });

    // Cart modal controls
    cartItemsList.addEventListener('click', (e) => {
        const productId = e.target.dataset.id;
        
        if (e.target.classList.contains('qty-increase-cart')) {
            updateQuantity(productId, 1);
        } else if (e.target.classList.contains('qty-decrease-cart')) {
            updateQuantity(productId, -1);
        } else if (e.target.classList.contains('remove-btn')) {
            removeFromCart(productId);
        }
    });

    cartToggle.addEventListener('click', toggleCartModal);
    cartCloseBtn.addEventListener('click', toggleCartModal);
    cartOverlay.addEventListener('click', toggleCartModal);

    // Checkout
    checkoutBtn.addEventListener('click', async () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        try {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            const response = await fetch('/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cart, total: total })
            });

            const result = await response.json();

            if (response.ok) {
                alert('✅ ' + result.message);
                cart = [];
                saveCart();
                updateCartDisplay();
                toggleCartModal();
                
                // Reload products to remove quantity selectors
                const activeCategory = document.querySelector('.category-link.active');
                if (activeCategory) {
                    renderProducts(activeCategory.dataset.category);
                }
            } else {
                alert('❌ Error: ' + (result.error || 'Checkout failed'));
            }
        } catch (error) {
            alert('❌ Checkout failed: ' + error.message);
        }
    });

    // --- 5. INITIALIZATION ---
    renderProducts('live-plants');
    updateCartDisplay();
});
