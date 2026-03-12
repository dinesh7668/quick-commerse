/* ═══════════════════════════════════════════
   ZIPBASKET — script.js
   Cart, Search, Filter, Animations, UI Logic
   ═══════════════════════════════════════════ */

'use strict';

// ── PRODUCT DATA ──────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: 'Alphonso Mangoes', cat: 'fruits',     emoji: '🥭', weight: '1 kg',  price: 249, mrp: 299, discount: 17, badge: 'HOT',   fresh: false },
  { id: 2, name: 'Fresh Strawberries', cat: 'fruits',   emoji: '🍓', weight: '250 g', price: 89,  mrp: 119, discount: 25, badge: 'SALE',  fresh: false },
  { id: 3, name: 'Organic Bananas',    cat: 'fruits',   emoji: '🍌', weight: '1 kg',  price: 59,  mrp: 79,  discount: 25, badge: '',      fresh: true  },
  { id: 4, name: 'Watermelon',         cat: 'fruits',   emoji: '🍉', weight: '2 kg',  price: 99,  mrp: 129, discount: 23, badge: 'HOT',   fresh: false },
  { id: 5, name: 'Broccoli Crown',     cat: 'vegetables', emoji: '🥦', weight: '500 g', price: 69, mrp: 89,  discount: 22, badge: 'FRESH', fresh: true  },
  { id: 6, name: 'Cherry Tomatoes',    cat: 'vegetables', emoji: '🍅', weight: '250 g', price: 49, mrp: 69,  discount: 29, badge: '',      fresh: true  },
  { id: 7, name: 'Baby Spinach',       cat: 'vegetables', emoji: '🌿', weight: '200 g', price: 39, mrp: 55,  discount: 29, badge: 'FRESH', fresh: true  },
  { id: 8, name: 'Avocados',           cat: 'vegetables', emoji: '🥑', weight: '2 pcs', price: 149, mrp: 199, discount: 25, badge: 'HOT',  fresh: false },
  { id: 9, name: 'Full Cream Milk',    cat: 'dairy',    emoji: '🥛', weight: '1 L',   price: 62,  mrp: 68,  discount: 9,  badge: '',      fresh: true  },
  { id:10, name: 'Greek Yogurt',       cat: 'dairy',    emoji: '🍶', weight: '400 g', price: 79,  mrp: 99,  discount: 20, badge: 'SALE',  fresh: false },
  { id:11, name: 'Salted Butter',      cat: 'dairy',    emoji: '🧈', weight: '100 g', price: 55,  mrp: 65,  discount: 15, badge: '',      fresh: false },
  { id:12, name: 'Cheddar Cheese',     cat: 'dairy',    emoji: '🧀', weight: '200 g', price: 149, mrp: 189, discount: 21, badge: 'HOT',   fresh: false },
  { id:13, name: 'Lay\'s Classic',     cat: 'snacks',   emoji: '🥔', weight: '52 g',  price: 20,  mrp: 20,  discount: 0,  badge: '',      fresh: false },
  { id:14, name: 'Dark Chocolate',     cat: 'snacks',   emoji: '🍫', weight: '90 g',  price: 149, mrp: 175, discount: 15, badge: 'SALE',  fresh: false },
  { id:15, name: 'Popcorn Caramel',    cat: 'snacks',   emoji: '🍿', weight: '80 g',  price: 99,  mrp: 119, discount: 17, badge: '',      fresh: false },
  { id:16, name: 'Roasted Almonds',    cat: 'snacks',   emoji: '🫘', weight: '200 g', price: 229, mrp: 279, discount: 18, badge: 'SALE',  fresh: false },
  { id:17, name: 'Orange Juice',       cat: 'beverages', emoji: '🍊', weight: '1 L',  price: 89,  mrp: 110, discount: 19, badge: '',      fresh: true  },
  { id:18, name: 'Coconut Water',      cat: 'beverages', emoji: '🥥', weight: '500 ml', price: 49, mrp: 60,  discount: 18, badge: 'FRESH', fresh: true  },
  { id:19, name: 'Green Tea (10 bags)',cat: 'beverages', emoji: '🍵', weight: '10 pcs', price: 79, mrp: 99,  discount: 20, badge: '',      fresh: false },
  { id:20, name: 'Cold Brew Coffee',   cat: 'beverages', emoji: '☕', weight: '250 ml', price: 119, mrp: 149, discount: 20, badge: 'HOT',  fresh: false },
  { id:21, name: 'Sourdough Bread',    cat: 'bakery',   emoji: '🍞', weight: '400 g', price: 89,  mrp: 110, discount: 19, badge: '',      fresh: true  },
  { id:22, name: 'Blueberry Muffin',   cat: 'bakery',   emoji: '🫐', weight: '2 pcs', price: 79,  mrp: 99,  discount: 20, badge: 'HOT',   fresh: true  },
  { id:23, name: 'Moisturiser SPF 30', cat: 'personal', emoji: '🧴', weight: '75 ml', price: 199, mrp: 250, discount: 20, badge: 'SALE',  fresh: false },
  { id:24, name: 'Shampoo Botanical',  cat: 'personal', emoji: '🪥', weight: '200 ml', price: 249, mrp: 299, discount: 17, badge: '',     fresh: false },
];

// ── COUPON CODES ──────────────────────────────────────────────
const COUPONS = {
  FIRST60: 60,
  BOGO:    50,
  ZIP20:   20,
  SAVE30:  30,
};

// ── STATE ─────────────────────────────────────────────────────
let cart          = JSON.parse(localStorage.getItem('zipbasket_cart') || '{}');
let quantities    = {};   // per-product-card qty selectors
let activeCategory = 'all';
let searchQuery   = '';
let currentSort   = 'default';
let appliedCoupon = null;

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  renderProducts();
  initCategories();
  initSearch();
  initSort();
  initCartDrawer();
  initLoginModal();
  initScrollAnimations();
  initSmoothScroll();
  updateCartUI();
});

// ── LOADER ────────────────────────────────────────────────────
function initLoader() {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('done');
    setTimeout(() => loader.remove(), 500);
  }, 1800);
}

// ── NAVBAR SCROLL EFFECT ──────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ── RENDER PRODUCTS ───────────────────────────────────────────
function renderProducts() {
  const grid     = document.getElementById('productsGrid');
  const noRes    = document.getElementById('noResults');
  const titleEl  = document.getElementById('productsTitle');

  let filtered = [...PRODUCTS];

  // category filter
  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.cat === activeCategory);
  }

  // search filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q)
    );
  }

  // sort
  if (currentSort === 'price-asc')  filtered.sort((a,b) => a.price - b.price);
  if (currentSort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  if (currentSort === 'name')       filtered.sort((a,b) => a.name.localeCompare(b.name));

  // title
  const catLabels = { all:'All Products', fruits:'Fresh Fruits', vegetables:'Fresh Vegetables',
                      dairy:'Dairy & Eggs', snacks:'Snacks & Munchies',
                      beverages:'Drinks & Beverages', bakery:'Bakery & Breads', personal:'Personal Care' };
  titleEl.textContent = catLabels[activeCategory] || 'All Products';

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noRes.classList.remove('hidden');
    return;
  }
  noRes.classList.add('hidden');

  grid.innerHTML = filtered.map((p, idx) => buildProductCard(p, idx)).join('');

  // bind buttons
  grid.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const pid  = Number(e.target.closest('[data-pid]').dataset.pid);
      const dir  = e.target.dataset.dir;
      changeLocalQty(pid, dir);
    });
  });
  grid.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      const pid = Number(e.target.dataset.pid);
      addToCart(pid, e.target);
    });
  });
}

function buildProductCard(p, idx) {
  const inCart = !!cart[p.id];
  const qty    = quantities[p.id] || 1;
  const badgeHtml = p.badge
    ? `<div class="product-badge ${p.fresh?'fresh':''}">${p.fresh?'FRESH':p.badge}</div>`
    : (p.fresh ? '<div class="product-badge fresh">FRESH</div>' : '');
  const discHtml = p.discount > 0
    ? `<span class="product-mrp">₹${p.mrp}</span><span class="product-discount">${p.discount}% off</span>`
    : '';

  return `
    <div class="product-card" data-pid="${p.id}" style="animation-delay:${idx*0.04}s">
      <div class="product-img-wrap">
        ${badgeHtml}
        <span class="product-emoji">${p.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-weight">${p.weight}</div>
        <div class="product-price-row">
          <span class="product-price">₹${p.price}</span>
          ${discHtml}
        </div>
      </div>
      <div class="product-actions" data-pid="${p.id}">
        <div class="qty-selector">
          <button class="qty-btn" data-dir="dec">−</button>
          <span class="qty-num" id="qtyNum-${p.id}">${qty}</span>
          <button class="qty-btn" data-dir="inc">+</button>
        </div>
        <button class="btn-add-cart ${inCart?'in-cart':''}" data-pid="${p.id}">
          ${inCart ? '✓ Added' : 'Add'}
        </button>
      </div>
    </div>`;
}

// ── LOCAL QTY (on card) ────────────────────────────────────────
function changeLocalQty(pid, dir) {
  if (!quantities[pid]) quantities[pid] = 1;
  if (dir === 'inc') quantities[pid] = Math.min(10, quantities[pid] + 1);
  if (dir === 'dec') quantities[pid] = Math.max(1, quantities[pid] - 1);
  const el = document.getElementById(`qtyNum-${pid}`);
  if (el) el.textContent = quantities[pid];
}

// ── ADD TO CART ────────────────────────────────────────────────
function addToCart(pid, btnEl) {
  const product = PRODUCTS.find(p => p.id === pid);
  if (!product) return;
  const qty = quantities[pid] || 1;

  if (cart[pid]) {
    cart[pid].qty += qty;
  } else {
    cart[pid] = { ...product, qty };
  }
  saveCart();
  updateCartUI();

  // animate button
  if (btnEl) {
    btnEl.classList.add('adding');
    btnEl.classList.add('in-cart');
    btnEl.textContent = '✓ Added';
    setTimeout(() => btnEl.classList.remove('adding'), 350);
  }

  showToast(`${product.emoji} ${product.name} added to cart!`);
  bumpCartIcon();
}

// ── CART UI ────────────────────────────────────────────────────
function updateCartUI() {
  const items = Object.values(cart);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const countEl = document.getElementById('cartCount');
  countEl.textContent = totalQty;

  renderCartDrawer();
}

function renderCartDrawer() {
  const items     = Object.values(cart);
  const itemsEl   = document.getElementById('cartItems');
  const emptyEl   = document.getElementById('cartEmpty');
  const footerEl  = document.getElementById('cartFooter');

  if (items.length === 0) {
    itemsEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
    footerEl.classList.add('hidden');
    return;
  }
  emptyEl.classList.add('hidden');
  footerEl.classList.remove('hidden');

  itemsEl.innerHTML = items.map(item => `
    <div class="cart-item">
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-weight">${item.weight}</div>
        <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString()}</div>
      </div>
      <div class="cart-item-qty">
        <button onclick="changeCartQty(${item.id}, 'dec')">−</button>
        <span>${item.qty}</span>
        <button onclick="changeCartQty(${item.id}, 'inc')">+</button>
      </div>
    </div>
  `).join('');

  // totals
  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount  = appliedCoupon ? COUPONS[appliedCoupon] : 0;
  const total     = Math.max(0, subtotal - discount);

  document.getElementById('cartSubtotal').textContent = `₹${subtotal.toLocaleString()}`;
  document.getElementById('cartTotal').textContent    = `₹${total.toLocaleString()}`;

  const discLine = document.getElementById('discountLine');
  if (discount > 0) {
    discLine.classList.remove('hidden');
    document.getElementById('discountAmt').textContent = `-₹${discount}`;
  } else {
    discLine.classList.add('hidden');
  }
}

function changeCartQty(pid, dir) {
  if (!cart[pid]) return;
  if (dir === 'inc') cart[pid].qty++;
  if (dir === 'dec') {
    cart[pid].qty--;
    if (cart[pid].qty <= 0) delete cart[pid];
  }
  saveCart();
  updateCartUI();
  // refresh add buttons on grid
  refreshAddButtons();
}

function refreshAddButtons() {
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    const pid = Number(btn.dataset.pid);
    if (cart[pid]) {
      btn.classList.add('in-cart');
      btn.textContent = '✓ Added';
    } else {
      btn.classList.remove('in-cart');
      btn.textContent = 'Add';
    }
  });
}

function saveCart() {
  localStorage.setItem('zipbasket_cart', JSON.stringify(cart));
}

function bumpCartIcon() {
  const c = document.getElementById('cartCount');
  c.classList.remove('bump');
  void c.offsetWidth; // reflow
  c.classList.add('bump');
}

// ── CART DRAWER OPEN/CLOSE ─────────────────────────────────────
function initCartDrawer() {
  document.getElementById('cartBtn').addEventListener('click', openCartDrawer);
  document.getElementById('closeCart').addEventListener('click', closeCartDrawer);
  document.getElementById('cartOverlay').addEventListener('click', closeCartDrawer);
  document.getElementById('applyCouponBtn').addEventListener('click', applyCoupon);
  document.getElementById('checkoutBtn').addEventListener('click', checkout);
}

function openCartDrawer() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.add('hidden');
  document.body.style.overflow = '';
}

// ── COUPON ────────────────────────────────────────────────────
function applyCoupon() {
  const code = document.getElementById('couponInput').value.trim().toUpperCase();
  if (COUPONS[code]) {
    appliedCoupon = code;
    showToast(`🎉 Coupon "${code}" applied! ₹${COUPONS[code]} off`);
    renderCartDrawer();
  } else {
    showToast('❌ Invalid coupon code');
  }
}

function applyCode(code) {
  document.getElementById('couponInput').value = code;
  openCartDrawer();
  setTimeout(() => {
    appliedCoupon = code;
    showToast(`🎉 Coupon "${code}" applied!`);
    renderCartDrawer();
  }, 400);
}

// ── CHECKOUT ──────────────────────────────────────────────────
function checkout() {
  const count = Object.values(cart).reduce((s,i) => s+i.qty, 0);
  if (count === 0) { showToast('Your cart is empty!'); return; }
  showToast('🛵 Order placed! Arriving in 10 minutes ⚡');
  cart = {};
  appliedCoupon = null;
  saveCart();
  updateCartUI();
  closeCartDrawer();
}

// ── CATEGORIES ────────────────────────────────────────────────
function initCategories() {
  document.getElementById('categoriesGrid').addEventListener('click', e => {
    const btn = e.target.closest('.cat-card');
    if (!btn) return;
    document.querySelectorAll('.cat-card').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    renderProducts();
  });
}

// ── SEARCH ────────────────────────────────────────────────────
function initSearch() {
  const input = document.getElementById('searchInput');
  const clear = document.getElementById('searchClear');

  input.addEventListener('input', () => {
    searchQuery = input.value;
    clear.style.display = searchQuery ? 'flex' : 'none';
    renderProducts();

    // auto-scroll to products
    if (searchQuery && window.scrollY < document.getElementById('products').offsetTop - 100) {
      document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  clear.addEventListener('click', () => {
    input.value = '';
    searchQuery = '';
    clear.style.display = 'none';
    renderProducts();
  });

  // Keyboard shortcut: '/' focuses search
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
  });
}

// ── SORT ──────────────────────────────────────────────────────
function initSort() {
  document.getElementById('sortSelect').addEventListener('change', e => {
    currentSort = e.target.value;
    renderProducts();
  });
}

// ── LOGIN MODAL ───────────────────────────────────────────────
function initLoginModal() {
  document.getElementById('loginBtn').addEventListener('click', () => {
    document.getElementById('loginModal').classList.remove('hidden');
  });
  document.getElementById('closeLogin').addEventListener('click', () => {
    document.getElementById('loginModal').classList.add('hidden');
  });
  document.getElementById('loginModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) e.currentTarget.classList.add('hidden');
  });
}

// ── TOAST ─────────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 2800);
}

// ── SMOOTH SCROLL ─────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── SCROLL FADE-IN ANIMATIONS ─────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
