document.addEventListener('DOMContentLoaded', () => {

    // --- 1. PRODUCT DATA (4 products per category) ---
    const allProducts = {
        'live-plants': [
            { 
                id: 'lp1', 
                name: 'Monstera Deliciosa', 
                price: 35.00, 
                img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd8d2c17?w=300&h=300&fit=crop',
                category: 'live-plants'
            },
            { 
                id: 'lp2', 
                name: 'Snake Plant', 
                price: 28.00, 
                img: 'https://images.unsplash.com/photo-1632119220175-4902230e146f?w=300&h=300&fit=crop',
                category: 'live-plants'
            },
            { 
                id: 'lp3', 
                name: 'Pothos Vine', 
                price: 22.00, 
                img: 'https://images.unsplash.com/photo-1604175481369-902eac612519?w=300&h=300&fit=crop',
                category: 'live-plants'
            },
            { 
                id: 'lp4', 
                name: 'Spider Plant', 
                price: 18.00, 
                img: 'https://images.unsplash.com/photo-1597848212624-59812c2f0fc2?w=300&h=300&fit=crop',
                category: 'live-plants'
            }
        ],
        'artificial-plants': [
            { 
                id: 'ap1', 
                name: 'Faux Fiddle Leaf Fig', 
                price: 65.00, 
                img: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd4b37f?w=300&h=300&fit=crop',
                category: 'artificial-plants'
            },
            { 
                id: 'ap2', 
                name: 'Artificial Orchid', 
                price: 40.00, 
                img: 'https://images.unsplash.com/photo-1615878519454-a3d7a50b32f1?w=300&h=300&fit=crop',
                category: 'artificial-plants'
            },
            { 
                id: 'ap3', 
                name: 'Fake Fern', 
                price: 32.00, 
                img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
                category: 'artificial-plants'
            },
            { 
                id: 'ap4', 
                name: 'Synthetic Ivy Plant', 
                price: 28.00, 
                img: 'https://images.unsplash.com/photo-1612521534527-b4e2fbf0a6e4?w=300&h=300&fit=crop',
                category: 'artificial-plants'
            }
        ],
        'soil': [
            { 
                id: 's1', 
                name: 'Premium Potting Mix', 
                price: 15.00, 
                img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=300&fit=crop',
                category: 'soil'
            },
            { 
                id: 's2', 
                name: 'Cactus & Succulent Soil', 
                price: 18.00, 
                img: 'https://images.unsplash.com/photo-1600832674773-26d3a9e3c4c5?w=300&h=300&fit=crop',
                category: 'soil'
            },
            { 
                id: 's3', 
                name: 'All-Purpose Fertilizer', 
                price: 22.00, 
                img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=300&fit=crop',
                category: 'soil'
            },
            { 
                id: 's4', 
                name: 'Organic Compost', 
                price: 20.00, 
                img: 'https://images.unsplash.com/photo-1600832674773-26d3a9e3c4c5?w=300&h=300&fit=crop',
                category: 'soil'
            }
        ]
    };

    const categoryTitles = {
        'live-plants': '🌱 Live Plants',
        'artificial-plants': '🎨 Artificial Plants',
        'soil': '🌍 Soil & Fertilizers'
    };

    // --- 2. DOM ELEMENTS ---
    const productGrid = document.getElementById('product-grid');
    const pageTitle = document.getElementById('page-title');
    const categoryLinks = document.querySelectorAll('.category-link');
    const cartToggle = document.getElementById('cart-toggle');
    const cartModal = document.getElementById('cart-modal');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartCloseBtn = document.getElementById('cart-close');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalEl = document.getElementById('cart-total');
    const cartItemCountEl = document.getElementById('cart-item-count');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Cart state
    let cart = JSON.parse(localStorage.getItem('nurseryCart')) || [];

    // --- 3. CORE FUNCTIONS ---

    /**
     * Render products for a category
     */
    function renderProducts(category) {
        productGrid.innerHTML = '';
        pageTitle.textContent = categoryTitles[category] || 'Products';

        const products = allProducts[category] || [];

        if (products.length === 0) {
            productGrid.innerHTML = '<p>No products found.</p>';
            return;
        }

        products.forEach(product => {
            const cartItem = cart.find(item => item.id === product.id);
            const quantity = cartItem ? cartItem.quantity : 0;

            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x300?text=Image+Not+Found'">
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        ${quantity === 0 ? `
                            <button class="add-to-cart-btn" data-id="${product.id}">+ Add to Cart</button>
                        ` : `
                            <div class="quantity-controls">
                                <button class="quantity-btn qty-decrease" data-id="${product.id}">−</button>
                                <div class="quantity-display">${quantity}</div>
                                <button class="quantity-btn qty-increase" data-id="${product.id}">+</button>
                            </div>
                        `}
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    /**
     * Add product to cart
     */
    function addToCart(productId) {
        let found = false;
        
        for (const category in allProducts) {
            const product = allProducts[category].find(p => p.id === productId);
            if (product) {
                const cartItem = cart.find(item => item.id === productId);
                if (!cartItem) {
                    cart.push({ ...product, quantity: 1 });
                }
                found = true;
                break;
            }
        }

        saveCart();
        updateCartDisplay();
        
        // Re-render current category
        const activeCategory = document.querySelector('.category-link.active');
        if (activeCategory) {
            renderProducts(activeCategory.dataset.category);
        }
    }

    /**
     * Update quantity
     */
    function updateQuantity(productId, change) {
        const cartItem = cart.find(item => item.id === productId);
        if (!cartItem) return;

        cartItem.quantity += change;
        
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        saveCart();
        updateCartDisplay();
        
        // Re-render current category
        const activeCategory = document.querySelector('.category-link.active');
        if (activeCategory) {
            renderProducts(activeCategory.dataset.category);
        }
    }

    /**
     * Remove from cart
     */
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartDisplay();
        
        // Re-render current category
        const activeCategory = document.querySelector('.category-link.active');
        if (activeCategory) {
            renderProducts(activeCategory.dataset.category);
        }
    }

    /**
     * Save cart to localStorage
     */
    function saveCart() {
        localStorage.setItem('nurseryCart', JSON.stringify(cart));
    }

    /**
     * Update cart display modal
     */
    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<div class="cart-empty">🛒 Your cart is empty</div>';
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;
                totalItems += item.quantity;

                const cartItemEl = document.createElement('div');
                cartItemEl.className = 'cart-item';
                cartItemEl.innerHTML = `
                    <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80?text=Image'">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-controls">
                            <div class="quantity-control-mini">
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
